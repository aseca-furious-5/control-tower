import { Order, OrderInput } from '../model/order.model';

export abstract class OrderRepository {
  abstract createOrder(orderInput: OrderInput): Order;

  abstract orderExists(id: number): boolean;
}
