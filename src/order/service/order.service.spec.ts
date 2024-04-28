import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ItemModule } from '../../item/item.module';
import { ItemService } from '../../item/service/item.service';

describe('OrderService', () => {
  let service: OrderService;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ItemModule],
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('001 _ should create an empty order', () => {
    const items = [];

    const newOrder = service.createOrder({ items });

    expect(newOrder).toEqual({ id: expect.any(Number), items: [] });
  });

  it('002 _ should create an order with one item', () => {
    const newItem = itemService.createItem({ name: 'Item 1', price: 100 });
    const orderItems = [{ id: newItem.id, quantity: 1 }];

    const newOrder = service.createOrder({ items: orderItems });

    expect(newOrder).toEqual({
      id: expect.any(Number),
      items: [{ id: 1, quantity: 1 }],
    });
  });

  it('003 _ should return two different orders that have the same item', () => {
    const newItem = itemService.createItem({ name: 'Item 1', price: 100 });
    const orderItems = [{ id: newItem.id, quantity: 1 }];

    const newOrder1 = service.createOrder({ items: orderItems });
    const newOrder2 = service.createOrder({ items: orderItems });

    expect(newOrder1).not.toEqual(newOrder2);
  });

  it('004 _ should throw an error if the item does not exist', () => {
    const orderItems = [{ id: 1, quantity: 1 }];

    expect(() => service.createOrder({ items: orderItems })).toThrow();
  });
});
