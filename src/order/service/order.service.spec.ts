import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ItemService } from '../../item/service/item.service';
import { orderRepositoryMockProvider } from '../repository/order.repository.mock';
import { itemRepositoryMockProvider } from '../../item/repository/item.repository.mock';
import { NotFoundException } from '@nestjs/common';
import { WarehouseServiceMock, warehouseServiceMockProvider } from '../../warehouse/service/warehouse.service.mock';
import { WarehouseService } from '../../warehouse/service/warehouse.service';



describe('OrderService', () => {
  let service: OrderService;
  let itemService: ItemService;
  let warehouseServiceMock: WarehouseServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        orderRepositoryMockProvider,
        ItemService,
        itemRepositoryMockProvider,
        warehouseServiceMockProvider
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    itemService = module.get<ItemService>(ItemService);
    warehouseServiceMock = module.get<WarehouseServiceMock>(WarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('001 _ should create an empty order', async () => {
    const items = [];

    const newOrder = await service.createOrder({ items });

    expect(newOrder).toEqual({
      id: expect.any(Number),
      items: [],
      status: 'new',
    });
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
      status: 'new',
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

  it('005 _ should be created with status new', async () => {
    const items = [];

    const newOrder = await service.createOrder({ items });

    expect(newOrder.status).toBe('new');
  });

  it('006 _ should change status when updated', async () => {
    const items = [];

    const newOrder = await service.createOrder({ items });

    const updatedOrder = await service.updateOrderStatus(newOrder.id, 'paid');

    expect(updatedOrder.status).toBe('paid');
  });

  it('007 _ should throw an error when updating if the order does not exist', async () => {
    await expect(service.updateOrderStatus(1, 'paid')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('008 _ should get correct order by id', async () => {
    const items = [];

    const newOrder = await service.createOrder({ items });

    const order = await service.getOrderById(newOrder.id);

    expect(order).toEqual(newOrder);
  });

  it('009 _ should throw an error when getting an order that does not exist', async () => {
    await expect(service.getOrderById(1)).rejects.toThrow(NotFoundException);
  });

  it('010 _ should create a warehouse preparation when creating an order', async () => {
    const newItem = await itemService.createItem({
      name: 'Item 1',
      price: 100,
    });

    const newOrder = await service.createOrder({
      items: [{ id: newItem.id, quantity: 2 }],
    });

    expect(warehouseServiceMock.preparedOrders).toEqual([newOrder]);
  });
});
