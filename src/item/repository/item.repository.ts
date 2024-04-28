import { Item, ItemInput } from '../model/item.model';

export abstract class ItemRepository {
  abstract createItem(newItem: ItemInput): Item;

  abstract itemExists(id: number): boolean;
}
