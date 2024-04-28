import { ItemRepository } from './item.repository';
import { Item, ItemInput } from '../model/item.model';
import { PrismaService } from '../../prisma/prisma.service';
import { Inject } from '@nestjs/common';

class ItemRepositoryDb implements ItemRepository {
  constructor(@Inject(PrismaService) private readonly db: PrismaService) {}

  async createItem(newItem: ItemInput): Promise<Item> {
    return this.db.item.create({
      data: {
        name: newItem.name,
        price: newItem.price,
      },
    });
  }

  async itemExists(id: number): Promise<boolean> {
    const result = await this.db.item.findUnique({
      where: { id },
    });

    return !!result;
  }
}

export const itemRepositoryDbProvider = {
  provide: ItemRepository,
  useClass: ItemRepositoryDb,
};
