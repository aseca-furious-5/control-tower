import { ItemRepository } from '../repository/item.repository';
import { Item, ItemInput } from '../model/item.model';
import { Injectable } from '@nestjs/common';

@Injectable()
class ItemRepositoryMock implements ItemRepository {
  private items: Item[] = [];
  private nextId = 1;
  createItem(newItem: ItemInput): Item {
    const newItemWithId = { ...newItem, id: this.nextId };
    this.items.push(newItemWithId);
    this.nextId++;
    return newItemWithId;
  }

  itemExists(id: number): boolean {
    return this.items.some((item) => item.id === id);
  }
}

export const itemRepositoryMockProvider = {
  provide: ItemRepository,
  useClass: ItemRepositoryMock,
};
