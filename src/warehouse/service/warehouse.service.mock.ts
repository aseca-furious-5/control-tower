import { WarehouseService } from './warehouse.service';
import { Order } from '../../order/model/order.model';

export class WarehouseServiceMock extends WarehouseService {
  preparedOrders: Order[] = [];

  async createPreparationForOrder(newOrder: Order) {
    this.preparedOrders.push(newOrder);
  }
}

export const warehouseServiceMockProvider = {
  provide: WarehouseService,
  useClass: WarehouseServiceMock,
};