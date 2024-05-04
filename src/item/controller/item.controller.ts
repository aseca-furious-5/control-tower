import { Body, Controller, Post } from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { Item, ItemInput } from '../model/item.model';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Post()
  createItem(@Body() newItemInput: ItemInput): Promise<Item> {
    return this.service.createItem(newItemInput);
  }
}
