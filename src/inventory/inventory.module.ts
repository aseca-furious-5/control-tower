import { Module } from '@nestjs/common';
import { inventoryServiceHttpProvider } from './service/inventory.service.http';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [inventoryServiceHttpProvider],
  exports: [inventoryServiceHttpProvider],
})
export class InventoryModule {}
