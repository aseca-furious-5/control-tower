import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [ItemModule, OrderModule, ConfigModule.forRoot(), PrismaModule, InventoryModule, WarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
