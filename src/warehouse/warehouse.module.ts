import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { warehouseServiceHttpProvider } from './service/warehouse.service.http';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [warehouseServiceHttpProvider],
  exports: [warehouseServiceHttpProvider],
})
export class WarehouseModule {}