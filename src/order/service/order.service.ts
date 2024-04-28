import { Injectable } from '@nestjs/common';
import { Order, OrderInput } from '../model/order.model';
import { ItemService } from '../../item/service/item.service';

@Injectable()
export class OrderService {
  private nextId = 1;

  constructor(private readonly itemService: ItemService) {}

  createOrder(orderInput: OrderInput): Order {
    for (const orderItem of orderInput.items) {
      if (!this.itemService.itemExists(orderItem.id)) {
        throw new Error(`Item with id ${orderItem.id} does not exist`);
      }
    }

    const newOrder = { id: this.nextId, items: orderInput.items };
    this.nextId++;
    return newOrder;
  }
}
