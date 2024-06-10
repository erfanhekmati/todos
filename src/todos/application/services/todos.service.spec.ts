import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import {
  AddItemToTodoListDto,
  CreateTodoListDto,
  UpdateTodoItemDto,
  UpdateTodoListDto,
} from '../../domain';
import {
  AddTodoItemCommand,
  CreateTodoListCommand,
  FindAllTodoListsCommand,
  FindTodoItemByIdCommand,
  FindTodoListByIdCommand,
  RemoveTodoItemCommand,
  RemoveTodoListCommand,
  UpdateTodoItemCommand,
  UpdateTodoListCommand,
} from '../commands';

describe('TodosService', () => {
  let service: TodosService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneList', () => {
    it('should return a list if found', async () => {
      const mockList = { id: '1', title: 'Test List' };
      commandBus.execute = jest.fn().mockResolvedValue(mockList);

      const result = await service.findOneList('userId', '1');
      expect(result).toEqual(mockList);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new FindTodoListByIdCommand({ _id: '1', userId: 'userId' }),
      );
    });

    it('should throw NotFoundException if list not found', async () => {
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(service.findOneList('userId', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAllLists', () => {
    it('should return all lists for a user', async () => {
      const mockLists = [{ id: '1', title: 'Test List' }];
      commandBus.execute = jest.fn().mockResolvedValue(mockLists);

      const result = await service.findAllLists('userId');
      expect(result).toEqual(mockLists);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new FindAllTodoListsCommand({ userId: 'userId' }),
      );
    });
  });

  describe('createList', () => {
    it('should create a new todo list', async () => {
      const mockList = { id: '1', title: 'Test List' };
      const createDto: CreateTodoListDto = { title: 'Test List' };
      commandBus.execute = jest.fn().mockResolvedValue(mockList);

      const result = await service.createList('userId', createDto);
      expect(result).toEqual(mockList);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateTodoListCommand('Test List', 'userId'),
      );
    });
  });

  describe('updateList', () => {
    it('should update an existing todo list', async () => {
      const updateDto: UpdateTodoListDto = { title: 'Updated List' };
      const mockList = { id: '1', title: 'Test List' };
      commandBus.execute = jest.fn().mockResolvedValue(mockList);

      await service.updateList('userId', '1', updateDto);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateTodoListCommand('1', 'Updated List'),
      );
    });

    it('should throw NotFoundException if list not found during update', async () => {
      const updateDto: UpdateTodoListDto = { title: 'Updated List' };
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(
        service.updateList('userId', '1', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneItem', () => {
    it('should return an item if found', async () => {
      const mockItem = { id: '1', description: 'Test Item' };
      commandBus.execute = jest.fn().mockResolvedValue(mockItem);

      const result = await service.findOneItem('1');
      expect(result).toEqual(mockItem);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new FindTodoItemByIdCommand({ _id: '1' }),
      );
    });

    it('should throw NotFoundException if item not found', async () => {
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(service.findOneItem('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('addItemToList', () => {
    it('should add an item to the list', async () => {
      const addItemDto: AddItemToTodoListDto = {
        description: 'New Item',
        priority: 1,
        todoListId: '1',
      };
      const mockItem = { id: '1', description: 'New Item' };
      commandBus.execute = jest.fn().mockResolvedValue(mockItem);

      const result = await service.addItemToList('userId', addItemDto);
      expect(result).toEqual(mockItem);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new AddTodoItemCommand('New Item', 1, '1'),
      );
    });

    it('should throw NotFoundException if list not found', async () => {
      const addItemDto: AddItemToTodoListDto = {
        description: 'New Item',
        priority: 1,
        todoListId: '1',
      };
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(service.addItemToList('userId', addItemDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeList', () => {
    it('should remove a list', async () => {
      const mockList = { id: '1', title: 'Test List' };
      commandBus.execute = jest.fn().mockResolvedValue(mockList);

      const result = await service.removeList('userId', '1');
      expect(result).toEqual(mockList);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new RemoveTodoListCommand('userId', '1'),
      );
    });

    it('should throw NotFoundException if list not found during remove', async () => {
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(service.removeList('userId', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeItemFromList', () => {
    it('should remove an item from the list', async () => {
      const mockItem = { id: '1', description: 'Test Item', todoList: '1' };
      commandBus.execute = jest.fn().mockResolvedValue(mockItem);

      const result = await service.removeItemFromList('userId', '1');
      expect(result).toEqual(mockItem);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new RemoveTodoItemCommand('userId', '1'),
      );
    });

    it('should throw NotFoundException if item not found during remove', async () => {
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(service.removeItemFromList('userId', '1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateItem', () => {
    it('should update an existing todo item', async () => {
      const updateItemDto: UpdateTodoItemDto = {
        description: 'Updated Item',
        priority: 1,
      };
      const mockItem = { id: '1', description: 'Test Item', todoList: '1' };
      commandBus.execute = jest.fn().mockResolvedValue(mockItem);

      await service.updateItem('userId', '1', updateItemDto);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateTodoItemCommand('1', updateItemDto),
      );
    });

    it('should throw NotFoundException if item not found during update', async () => {
      const updateItemDto: UpdateTodoItemDto = {
        description: 'Updated Item',
        priority: 1,
      };
      commandBus.execute = jest.fn().mockResolvedValue(null);

      await expect(
        service.updateItem('userId', '1', updateItemDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
