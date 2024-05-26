import { Module } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderService } from './service/order.service';
import { orderRepositoryDbProvider } from './repository/order.repository.db';
import { OrderController } from './controller/order.controller';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [ItemModule, PrismaModule, WarehouseModule],
  providers: [OrderService, orderRepositoryDbProvider],
  exports: [],
  controllers: [OrderController],
})
export class OrderModule {}
