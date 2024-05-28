import { Order, OrderInput } from '../model/order.model';

export abstract class OrderRepository {
  abstract createOrder(orderInput: OrderInput): Promise<Order>;

  abstract orderExists(id: number): Promise<boolean>;

  abstract updateOrderStatus(id: number, status: string): Promise<Order>;

  abstract getOrderById(id: number): Promise<Order>;

  abstract getAllOrders(): Promise<Order[]>;
}
