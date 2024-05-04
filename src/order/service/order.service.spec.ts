import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ItemService } from '../../item/service/item.service';
import { orderRepositoryMockProvider } from '../repository/order.repository.mock';
import { itemRepositoryMockProvider } from '../../item/repository/item.repository.mock';

describe('OrderService', () => {
  let service: OrderService;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        orderRepositoryMockProvider,
        ItemService,
        itemRepositoryMockProvider,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('001 _ should create an empty order', async () => {
    const items = [];

    const newOrder = await service.createOrder({ items });

    expect(newOrder).toEqual({ id: expect.any(Number), items: [] });
  });

  it('002 _ should create an order with one item', async () => {
    const newItem = await itemService.createItem({
      name: 'Item 1',
      price: 100,
    });
    const orderItems = [{ id: newItem.id, quantity: 1 }];

    const newOrder = await service.createOrder({ items: orderItems });

    expect(newOrder).toEqual({
      id: expect.any(Number),
      items: [{ id: 1, quantity: 1 }],
    });
  });

  it('003 _ should return two different orders that have the same item', async () => {
    const newItem = await itemService.createItem({
      name: 'Item 1',
      price: 100,
    });
    const orderItems = [{ id: newItem.id, quantity: 1 }];

    const newOrder1 = await service.createOrder({ items: orderItems });
    const newOrder2 = await service.createOrder({ items: orderItems });

    expect(newOrder1).not.toEqual(newOrder2);
  });

  it('004 _ should throw an error if the item does not exist', async () => {
    const orderItems = [{ id: 1, quantity: 1 }];

    await expect(service.createOrder({ items: orderItems })).rejects.toThrow();
  });
});
