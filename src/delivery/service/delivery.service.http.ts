import { DeliveryService } from './delivery.service';
import { Order } from '../../order/model/order.model';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
class DeliveryServiceHttp extends DeliveryService {
  private readonly deliveryServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.deliveryServiceUrl = this.configService.get<string>(
      'DELIVERY_SERVICE_URL',
    );
  }

  async createDeliveryForOrder(order: Order): Promise<void> {
    const requestItems = order.items.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      name: item.name,
    }));

    await this.httpService.axiosRef.post(
      `${this.deliveryServiceUrl}/deliveries/${order.id}`,
      {
        items: requestItems,
      },
    );
  }
}

export const deliveryServiceHttpProvider = {
  provide: DeliveryService,
  useClass: DeliveryServiceHttp,
};
