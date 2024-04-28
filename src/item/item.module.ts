import { Module } from '@nestjs/common';
import { ItemService } from './service/item.service';

@Module({
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
