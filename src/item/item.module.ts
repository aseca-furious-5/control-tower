import { Module } from '@nestjs/common';
import { ItemService } from './service/item.service';
import { itemRepositoryMockProvider } from './repository/item.repository.mock';

@Module({
  providers: [ItemService, itemRepositoryMockProvider],
  exports: [ItemService],
})
export class ItemModule {}
