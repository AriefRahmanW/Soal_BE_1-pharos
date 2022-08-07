import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { 
    AddNewTaskBodyDto, 
    AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';

import { TaskService } from '../services/task.service';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger'
import { ResponseErrorDto } from '../dto/error.dto';
import { TaskEntity } from '../entities/task.entity';
import { GetTaskByIdResponseDto } from '../dto/get-task-by-id.dto';
import { DeleteTaskSuccessDto } from '../dto/delete-task.dto';
import { GetBySearchQueryDto, GetBySearchResponseDto } from '../dto/get-by-search.dto';

ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('get')
    // @ApiQuery({type: GetBySearchQueryDto})
    @ApiResponse({status: 200, type: GetBySearchResponseDto})
    getBySearch(@Query() query: GetBySearchQueryDto): Promise<GetBySearchResponseDto> {
        return this.taskService.getBySearch(query);
    }

    @Post('add')
    @ApiBody({ type: AddNewTaskBodyDto})
    @ApiResponse({status: 200, type: AddNewTaskSuccessDto})
    @ApiResponse({status: 200, type: ResponseErrorDto})
    addNewTask(@Body() data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto> {
        return this.taskService.addNewTask(data);
    }

    @Get('get/:id')
    @ApiParam({ type: Number, description: 'Integer Task Id', name: 'id', example: 21 })
    @ApiResponse({status: 200, type: GetTaskByIdResponseDto})
    getTaskById(@Param("id") id: number): Promise<TaskEntity> {
        return this.taskService.getTaskById(id);
    }

    @Delete('delete/:id')
    @ApiParam({ type: Number, description: 'Integer Task Id', name: 'id', example: 21 })
    @ApiResponse({status: 200, type: DeleteTaskSuccessDto})
    deleteTask(@Param("id") id: number): Promise<DeleteTaskSuccessDto> {
        return this.taskService.deleteTask(id);
    }
}
