import { ItemRepository } from '../repository/item.repository';
import { Item, ItemInput } from '../model/item.model';
import { Injectable } from '@nestjs/common';

@Injectable()
class ItemRepositoryMock implements ItemRepository {
  private items: Item[] = [];
  private nextId = 1;

  createItem(newItem: ItemInput): Promise<Item> {
    const newItemWithId = { ...newItem, id: this.nextId };
    this.items.push(newItemWithId);
    this.nextId++;
    return Promise.resolve(newItemWithId);
  }

  itemExists(id: number): Promise<boolean> {
    return Promise.resolve(this.items.some((item) => item.id === id));
  }

  all(): Promise<Item[]> {
    return Promise.resolve(this.items);
  }
}

export const itemRepositoryMockProvider = {
  provide: ItemRepository,
  useClass: ItemRepositoryMock,
};
