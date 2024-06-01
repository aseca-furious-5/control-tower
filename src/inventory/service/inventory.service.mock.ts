import { InventoryService } from './inventory.service';
import { Item } from '../../item/model/item.model';

export class InventoryServiceMock extends InventoryService {
  savedItems: { itemId: number; quantity: number }[] = [];

  async createInventoryForItem(newItem: Item) {
    this.savedItems.push({ itemId: newItem.id, quantity: 3 });
  }

  async hasStock(itemId: number, quantity: number): Promise<boolean> {
    const item = this.savedItems.find((item) => item.itemId === itemId);
    return item.quantity > quantity;
  }

  async updateItemQuantity(itemId: number, quantity: number): Promise<void> {
    const item = this.savedItems.find((item) => item.itemId === itemId);
    item.quantity += quantity;
  }
}

export const inventoryServiceMockProvider = {
  provide: InventoryService,
  useClass: InventoryServiceMock,
};
