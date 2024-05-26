import { Order } from '../../order/model/order.model';

export abstract class DeliveryService {
  abstract createDeliveryForOrder(order: Order): Promise<void>;
}
