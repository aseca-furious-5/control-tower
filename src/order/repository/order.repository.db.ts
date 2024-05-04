import { OrderRepository } from './order.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Order, OrderInput } from '../model/order.model';
import { Inject } from '@nestjs/common';

export class OrderRepositoryDb implements OrderRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

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
        items: true,
      },
    });

    return {
      id: order.id,
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
  }

  async orderExists(id: number): Promise<boolean> {
    const result = await this.db.order.findUnique({
      where: { id },
    });

    return !!result;
  }
}

export const orderRepositoryDbProvider = {
  provide: OrderRepository,
  useClass: OrderRepositoryDb,
};
