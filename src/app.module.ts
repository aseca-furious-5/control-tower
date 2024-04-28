import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ItemModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
