import { Injectable } from '@nestjs/common';
import { Item, ItemInput } from '../model/item.model';

@Injectable()
export class ItemService {
  private items: Item[] = [];
  private nextId = 1;
  createItem(newItemInput: ItemInput): Item {
    const newItem = { id: this.nextId, ...newItemInput };
    this.nextId++;
    this.items.push(newItem);
    return newItem;
  }

  itemExists(id: number): boolean {
    return this.items.some((item) => item.id === id);
  }
}
