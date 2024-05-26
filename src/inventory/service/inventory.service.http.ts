import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InventoryService } from './inventory.service';
import { Item } from '../../item/model/item.model';

@Injectable()
export class InventoryServiceHttp extends InventoryService {
  private readonly inventoryUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.inventoryUrl = this.configService.get('INVENTORY_URL');
  }

  async createInventoryForItem(newItem: Item) {
    await this.httpService.axiosRef.post(`${this.inventoryUrl}/item`, {
      name: newItem.name,
      itemId: newItem.id,
    });
  }
}

export const inventoryServiceHttpProvider = {
  provide: InventoryService,
  useClass: InventoryServiceHttp,
};
