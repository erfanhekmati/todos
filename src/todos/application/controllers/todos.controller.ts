import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddItemToTodoListDto,
  CreateTodoListDto,
  UpdateTodoItemDto,
  UpdateTodoListDto,
} from '../../domain';
import { TodosService } from '../services/todos.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../auth/infrastructure';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ summary: 'Finds the todo list by id' })
  @ApiBearerAuth()
  @Get('lists/:id')
  findOneList(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.todosService.findOneList(userId, id);
  }

  @ApiOperation({ summary: 'Finds all todo lists' })
  @ApiBearerAuth()
  @Get('lists')
  findAllLists(@CurrentUser('userId') userId: string) {
    return this.todosService.findAllLists(userId);
  }

  @ApiOperation({ summary: 'Creates a todo list' })
  @ApiBearerAuth()
  @Post('lists')
  createList(
    @Body() createTodolistDto: CreateTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.createList(userId, createTodolistDto);
  }

  @ApiOperation({ summary: 'Updates a todo list' })
  @ApiBearerAuth()
  @Put('lists/:id')
  updateList(
    @Param('id') id: string,
    @Body() updateTodolistDto: UpdateTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.updateList(userId, id, updateTodolistDto);
  }

  @ApiOperation({ summary: 'Removes a todo list' })
  @ApiBearerAuth()
  @Delete('lists/:id')
  removeList(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.todosService.removeList(userId, id);
  }

  @ApiOperation({ summary: 'Adds an item to a todo list' })
  @ApiBearerAuth()
  @Post('items')
  addItemToList(
    @Body() dto: AddItemToTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.addItemToList(userId, dto);
  }

  @ApiOperation({ summary: 'Removes an item from a todo list' })
  @ApiBearerAuth()
  @Delete('items/:id')
  removeItemFromList(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.removeItemFromList(userId, id);
  }

  @ApiOperation({ summary: 'Updates a todo item' })
  @ApiBearerAuth()
  @Put('items/:id')
  updateTodoItem(
    @Param('id') id: string,
    @Body() dto: UpdateTodoItemDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.updateItem(userId, id, dto);
  }
}
