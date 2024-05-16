import { Injectable } from '@nestjs/common';
import { Item, ItemInput } from '../model/item.model';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly repository: ItemRepository) {}

  createItem(newItemInput: ItemInput): Promise<Item> {
    return this.repository.createItem(newItemInput);
  }

  itemExists(id: number): Promise<boolean> {
    return this.repository.itemExists(id);
  }

  async allItems() {
    return this.repository.all();
  }
}
