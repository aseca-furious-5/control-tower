import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, OrderInput } from '../model/order.model';
import { ItemService } from '../../item/service/item.service';
import { OrderRepository } from '../repository/order.repository';
import { WarehouseService } from '../../warehouse/service/warehouse.service';
import { DeliveryService } from '../../delivery/service/delivery.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly itemService: ItemService,
    private readonly warehouseService: WarehouseService,
    private readonly deliveryService: DeliveryService,
  ) {}

  async createOrder(orderInput: OrderInput): Promise<Order> {
    for (const orderItem of orderInput.items) {
      if (!(await this.itemService.itemExists(orderItem.id))) {
        throw new NotFoundException(
          `Item with id ${orderItem.id} does not exist`,
        );
      }
      const hasStock = await this.itemService.hasStock(
        orderItem.id,
        orderItem.quantity,
      );
      if (!hasStock) {
        throw new ConflictException(
          `Item with id ${orderItem.id} does not have enough stock`,
        );
      }
    }

    const newOrder = await this.repository.createOrder(orderInput);
    await this.warehouseService.createPreparationForOrder(newOrder);
    for (const orderItem of orderInput.items) {
      await this.itemService.updateItemQuantity(
        orderItem.id,
        -orderItem.quantity,
      );
    }
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    if (!(await this.repository.orderExists(id))) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }

    return this.repository.updateOrderStatus(id, status);
  }

  async getOrderById(id: number): Promise<Order> {
    if (!(await this.repository.orderExists(id))) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }
    return this.repository.getOrderById(id);
  }

  async dispatchOrder(id: number): Promise<void> {
    if (!(await this.repository.orderExists(id))) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }

    const order = await this.repository.getOrderById(id);
    await this.deliveryService.createDeliveryForOrder(order);
  }

  async getAllOrders() {
    return this.repository.getAllOrders();
  }
}
