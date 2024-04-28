import { Injectable } from '@nestjs/common';
import { Order, OrderInput } from '../model/order.model';
import { ItemService } from '../../item/service/item.service';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly itemService: ItemService,
  ) {}

  createOrder(orderInput: OrderInput): Order {
    for (const orderItem of orderInput.items) {
      if (!this.itemService.itemExists(orderItem.id)) {
        throw new Error(`Item with id ${orderItem.id} does not exist`);
      }
    }

    return this.repository.createOrder(orderInput);
  }
}
