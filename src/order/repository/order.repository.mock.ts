import { Order, OrderInput } from '../model/order.model';
import { OrderRepository } from './order.repository';

class OrderRepositoryMock implements OrderRepository {
  private orders: Order[] = [];
  private nextId = 1;

  createOrder(newOrder: OrderInput): Promise<Order> {
    const newOrderWithId = {
      items: newOrder.items.map(() => {
        return { id: 1, quantity: 1, name: 'item' };
      }),
      id: this.nextId,
      status: 'new',
    };
    this.orders.push(newOrderWithId);
    this.nextId++;
    return Promise.resolve(newOrderWithId);
  }

  orderExists(id: number): Promise<boolean> {
    return Promise.resolve(!!this.orders.find((order) => order.id === id));
  }

  updateOrderStatus(id: number, status: string): Promise<Order> {
    const orderToUpdate = this.orders.find((order) => order.id === id);
    const updatedOrder = { ...orderToUpdate, status };
    this.orders = this.orders.map((order) =>
      order.id === id ? updatedOrder : order,
    );
    return Promise.resolve(updatedOrder);
  }

  getOrderById(id: number): Promise<Order> {
    return Promise.resolve(this.orders.find((order) => order.id === id));
  }

  getAllOrders(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
}

export const orderRepositoryMockProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryMock,
};
