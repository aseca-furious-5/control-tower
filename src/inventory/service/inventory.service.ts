import { Item } from '../../item/model/item.model';

export abstract class InventoryService {
  abstract createInventoryForItem(newItem: Item): Promise<void>;
}
