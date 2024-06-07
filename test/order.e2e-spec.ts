import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ItemRepository } from '../src/item/repository/item.repository';
import { InventoryService } from '../src/inventory/service/inventory.service';
import { WarehouseService } from '../src/warehouse/service/warehouse.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let itemRepository: ItemRepository;
  let inventoryService: InventoryService;
  let warehouseService: WarehouseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    itemRepository = moduleFixture.get<ItemRepository>(ItemRepository);
    inventoryService = moduleFixture.get<InventoryService>(InventoryService);
    warehouseService = moduleFixture.get<WarehouseService>(WarehouseService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) /order', async () => {
    await itemRepository.createItem({ name: 'item1', price: 100 });

    // We mock other services that will not be running in the test environment
    jest
      .spyOn(inventoryService, 'hasStock')
      .mockReturnValue(Promise.resolve(true));
    jest
      .spyOn(warehouseService, 'createPreparationForOrder')
      .mockReturnValue(Promise.resolve());
    jest
      .spyOn(inventoryService, 'updateItemQuantity')
      .mockReturnValue(Promise.resolve());

    // Make the request
    await request(app.getHttpServer())
      .post('/order')
      .send({ items: [{ id: 1, quantity: 1 }] })
      .expect(201);

    const result = await request(app.getHttpServer()).get('/order/all');

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
    expect(result.body[0].id).toBe(1);
    expect(result.body[0].status).toBe('NEW');
  });
});
