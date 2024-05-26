import { DeliveryService } from './delivery.service';
import { Order } from '../../order/model/order.model';

export class DeliveryServiceMock extends DeliveryService {
  deliveries: Order[] = [];

  async createDeliveryForOrder(order: Order): Promise<void> {
    this.deliveries.push(order);
  }
}

export const deliveryServiceMockProvider = {
  provide: DeliveryService,
  useClass: DeliveryServiceMock,
};
