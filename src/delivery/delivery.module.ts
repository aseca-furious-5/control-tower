import { Module } from '@nestjs/common';
import { deliveryServiceHttpProvider } from './service/delivery.service.http';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [deliveryServiceHttpProvider],
  exports: [deliveryServiceHttpProvider],
})
export class DeliveryModule {}
