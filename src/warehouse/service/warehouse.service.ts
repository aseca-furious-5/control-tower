import { Order } from '../../order/model/order.model';

export abstract class WarehouseService {
  abstract createPreparationForOrder(newOrder: Order): Promise<void>;
}