import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from '../service/item.service';
import { itemRepositoryMockProvider } from '../repository/item.repository.mock';
import { itemRepositoryDbProvider } from '../repository/item.repository.db';
import { inventoryServiceMockProvider } from '../../inventory/service/inventory.service.mock';

describe('ItemController', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        ItemService,
        itemRepositoryMockProvider,
        inventoryServiceMockProvider,
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
