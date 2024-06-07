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
  UpdateTodoListDto,
} from '../../domain';
import { TodosService } from '../services/todos.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../auth/infrastructure';

@ApiTags('Todos')
@Controller('todos/lists')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ summary: 'Finds the todo list by id' })
  @ApiBearerAuth()
  @Get(':id')
  findOneList(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.todosService.findOneList(userId, id);
  }

  @ApiOperation({ summary: 'Finds all todo lists' })
  @ApiBearerAuth()
  @Get()
  findAllLists(@CurrentUser('userId') userId: string) {
    return this.todosService.findAllLists(userId);
  }

  @ApiOperation({ summary: 'Creates a todo list' })
  @ApiBearerAuth()
  @Post()
  createList(
    @Body() createTodolistDto: CreateTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.createList(userId, createTodolistDto);
  }

  @ApiOperation({ summary: 'Updates a todo list' })
  @ApiBearerAuth()
  @Put(':id')
  updateList(
    @Param('id') id: string,
    @Body() updateTodolistDto: UpdateTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.updateList(userId, id, updateTodolistDto);
  }

  @ApiOperation({ summary: 'Adds an item to a todo list' })
  @ApiBearerAuth()
  @Post('add')
  addItemToList(
    @Body() dto: AddItemToTodoListDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.addItemToList(userId, dto);
  }

  @ApiOperation({ summary: 'Removes a todo list' })
  @ApiBearerAuth()
  @Delete(':id')
  removeList(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.todosService.removeList(userId, id);
  }

  @ApiOperation({ summary: 'Removes an item from a todo list' })
  @ApiBearerAuth()
  @Delete('remove/:id')
  removeItemFromList(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.todosService.removeItemFromList(userId, id);
  }
}
