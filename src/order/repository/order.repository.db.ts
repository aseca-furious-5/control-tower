import { OrderRepository } from './order.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Order, OrderInput } from '../model/order.model';
import { Inject } from '@nestjs/common';

export class OrderRepositoryDb implements OrderRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {
  }

  async createOrder(orderInput: OrderInput): Promise<Order> {
    const order = await this.db.order.create({
      data: {
        items: {
          create: orderInput.items.map((item) => ({
            item: { connect: { id: item.id } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return {
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.item.name,
      })),
      status: order.status,
    };
  }

  async orderExists(id: number): Promise<boolean> {
    const result = await this.db.order.findUnique({
      where: { id },
    });

    return !!result;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.db.order.findMany({
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.item.name,
        price: item.item.price,
      })),
      status: order.status,
    }));
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.db.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return {
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.item.name,
      })),
      status: order.status,
    };
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.db.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return {
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.item.name,
      })),
      status: order.status,
    };
  }
}

export const orderRepositoryDbProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryDb,
};
