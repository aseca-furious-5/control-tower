import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { orderRepositoryMockProvider } from '../repository/order.repository.mock';
import { ItemService } from '../../item/service/item.service';
import { itemRepositoryMockProvider } from '../../item/repository/item.repository.mock';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        ItemService,
        orderRepositoryMockProvider,
        itemRepositoryMockProvider,
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
