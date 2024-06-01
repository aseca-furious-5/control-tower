import { Injectable } from '@nestjs/common';
import { Item, ItemInput } from '../model/item.model';
import { ItemRepository } from '../repository/item.repository';
import { InventoryService } from '../../inventory/service/inventory.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly repository: ItemRepository,
    private readonly inventoryService: InventoryService,
  ) {}

  async createItem(newItemInput: ItemInput): Promise<Item> {
    const createdItem = await this.repository.createItem(newItemInput);
    await this.inventoryService.createInventoryForItem(createdItem);
    return createdItem;
  }

  itemExists(id: number): Promise<boolean> {
    return this.repository.itemExists(id);
  }

  async allItems() {
    return this.repository.all();
  }

  async hasStock(itemId: number, quantity: number) {
    return this.inventoryService.hasStock(itemId, quantity);
  }

  async updateItemQuantity(itemId: number, quantity: number) {
    return this.inventoryService.updateItemQuantity(itemId, quantity);
  }
}
