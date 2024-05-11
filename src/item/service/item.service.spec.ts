import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { itemRepositoryMockProvider } from '../repository/item.repository.mock';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, itemRepositoryMockProvider],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('001 _ should create an item', async () => {
    const newItem = await service.createItem({
      name: 'Item 1',
      price: 100,
    });

    expect(newItem).toEqual({
      id: expect.any(Number),
      name: 'Item 1',
      price: 100,
    });
  });

  it('002 _ should not create the same item twice', async () => {
    const newItem1 = await service.createItem({
      name: 'MyItem',
      price: 100,
    });

    const newItem2 = await service.createItem({
      name: 'MyItem',
      price: 100,
    });

    expect(newItem1).not.toEqual(newItem2);
  });

  it('003 _ should return false if an item does not exist', async () => {
    const itemExists = await service.itemExists(1);

    expect(itemExists).toBe(false);
  });

  it('004 _ should return true if an item exists', async () => {
    await service.createItem({
      name: 'MyItem',
      price: 100,
    });

    const itemExists = await service.itemExists(1);

    expect(itemExists).toBe(true);
  });

  it('005 _ should return all existing items', async () => {
    const newItem1 = await service.createItem({
      name: 'MyItem',
      price: 100,
    });

    const newItem2 = await service.createItem({
      name: 'MyItem',
      price: 100,
    });

    const itemExists = await service.allItems();

    expect(itemExists).toEqual([newItem1, newItem2]);
  });
});
