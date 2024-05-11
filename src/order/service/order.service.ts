import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderInput } from '../model/order.model';
import { ItemService } from '../../item/service/item.service';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly itemService: ItemService,
  ) {}

  async createOrder(orderInput: OrderInput): Promise<Order> {
    for (const orderItem of orderInput.items) {
      if (!(await this.itemService.itemExists(orderItem.id))) {
        throw new NotFoundException(
          `Item with id ${orderItem.id} does not exist`,
        );
      }
    }

    return this.repository.createOrder(orderInput);
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
}
