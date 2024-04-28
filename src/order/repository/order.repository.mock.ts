import { Order, OrderInput } from '../model/order.model';
import { OrderRepository } from './order.repository';

class OrderRepositoryMock implements OrderRepository {
  private orders: Order[] = [];
  private nextId = 1;
  createOrder(newOrder: OrderInput): Order {
    const newOrderWithId = { ...newOrder, id: this.nextId };
    this.orders.push(newOrderWithId);
    this.nextId++;
    return newOrderWithId;
  }

  orderExists(id: number): boolean {
    return this.orders.some((order) => order.id === id);
  }
}

export const orderRepositoryMockProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryMock,
};
