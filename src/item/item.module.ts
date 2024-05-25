import { Module } from '@nestjs/common';
import { ItemService } from './service/item.service';
import { PrismaModule } from '../prisma/prisma.module';
import { itemRepositoryDbProvider } from './repository/item.repository.db';
import { ItemController } from './controller/item.controller';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [PrismaModule, InventoryModule],
  providers: [ItemService, itemRepositoryDbProvider],
  exports: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
