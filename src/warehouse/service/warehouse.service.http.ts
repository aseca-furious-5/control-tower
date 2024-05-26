import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WarehouseService } from './warehouse.service';
import { Order } from '../../order/model/order.model';

@Injectable()
export class WarehouseServiceHttp extends WarehouseService {
  private readonly warehouseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.warehouseUrl = this.configService.get('WAREHOUSE_URL');
  }

  async createPreparationForOrder(newOrder: Order) {
    await this.httpService.axiosRef.post(`${this.warehouseUrl}/preparation/${newOrder.id}`);
  }
}

export const warehouseServiceHttpProvider = {
  provide: WarehouseService,
  useClass: WarehouseServiceHttp,
};