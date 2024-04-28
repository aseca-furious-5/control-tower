import { Item, ItemInput } from '../model/item.model';

export abstract class ItemRepository {
  abstract createItem(newItem: ItemInput): Promise<Item>;

  abstract itemExists(id: number): Promise<boolean>;
}
