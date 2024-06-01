import { Item } from '../../item/model/item.model';

export abstract class InventoryService {
  abstract createInventoryForItem(newItem: Item): Promise<void>;

  abstract hasStock(itemId: number, quantity: number): Promise<boolean>;

  abstract updateItemQuantity(itemId: number, quantity: number): Promise<void>;
}
