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

  async hasStock(itemId: number, quantity: number): Promise<boolean> {
    const response = await this.httpService.axiosRef.get(
      `${this.inventoryUrl}/item/has-enough-stock/${itemId}?quantity=${quantity}`,
    );

    return response.data;
  }

  async updateItemQuantity(itemId: number, quantity: number): Promise<void> {
    await this.httpService.axiosRef.put(`${this.inventoryUrl}/item/update`, {
      itemId,
      amount: quantity,
    });
  }
}

export const inventoryServiceHttpProvider = {
  provide: InventoryService,
  useClass: InventoryServiceHttp,
};
