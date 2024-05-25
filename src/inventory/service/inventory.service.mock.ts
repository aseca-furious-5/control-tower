import { InventoryService } from './inventory.service';
import { Item } from '../../item/model/item.model';

export class InventoryServiceMock extends InventoryService {
  savedItems: Item[] = [];

  async createInventoryForItem(newItem: Item) {
    this.savedItems.push(newItem);
  }
}

export const inventoryServiceMockProvider = {
  provide: InventoryService,
  useClass: InventoryServiceMock,
};
