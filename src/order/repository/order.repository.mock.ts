import { Order, OrderInput } from '../model/order.model';
import { OrderRepository } from './order.repository';

class OrderRepositoryMock implements OrderRepository {
  private orders: Order[] = [];
  private nextId = 1;
  createOrder(newOrder: OrderInput): Promise<Order> {
    const newOrderWithId = { ...newOrder, id: this.nextId };
    this.orders.push(newOrderWithId);
    this.nextId++;
    return Promise.resolve(newOrderWithId);
  }

  orderExists(id: number): Promise<boolean> {
    return Promise.resolve(!!this.orders.find((order) => order.id === id));
  }
}

export const orderRepositoryMockProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryMock,
};
