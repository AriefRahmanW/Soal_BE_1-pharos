import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseFilters } from '@nestjs/common';
import { 
    AddNewTaskBodyDto, 
    AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';

import { TaskService } from '../services/task.service';
import { ApiTags, ApiResponse, ApiParam} from '@nestjs/swagger'
import { ResponseErrorDto } from '../dto/error.dto';
import { GetTaskByIdResponseDto } from '../dto/get-task-by-id.dto';
import { DeleteTaskSuccessDto } from '../dto/delete-task.dto';
import { GetBySearchQueryDto, GetBySearchResponseDto } from '../dto/get-by-search.dto';
import { UpdateDataBodyDto, UpdateDataSuccessDto } from '../dto/update-data.dto';
import { QueryParamExceptionFilter } from '../exceptions/query-param.exception';
import { InternalServerExceptionFilter } from '../exceptions/internal-server.exception';

@ApiTags('Task')
@UseFilters(new QueryParamExceptionFilter())
@UseFilters(new InternalServerExceptionFilter())
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('get')
    @ApiResponse({status: 200, type: GetBySearchResponseDto})
    getBySearch(@Query() query: GetBySearchQueryDto): Promise<GetBySearchResponseDto> {
        return this.taskService.getBySearch(query);
    }

    @Get('get/:id')
    @ApiParam({ type: Number, description: 'Integer Task Id', name: 'id', example: 21 })
    @ApiResponse({status: 200, type: GetTaskByIdResponseDto})
    getTaskById(@Param("id") id: number): Promise<GetTaskByIdResponseDto> {
        return this.taskService.getTaskById(id);
    }

    @Post('add')
    @ApiResponse({status: 200, type: AddNewTaskSuccessDto})
    @ApiResponse({status: 200, type: ResponseErrorDto})
    addNewTask(@Body() data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto> {
        return this.taskService.addNewTask(data);
    }

    @Put('update/:id')
    @ApiResponse({status: 200, type: UpdateDataSuccessDto})
    updateData(@Param("id") id: number, @Body() data: UpdateDataBodyDto): Promise<UpdateDataSuccessDto> {
        return this.taskService.updateData(id, data);
    }

    @Delete('delete/:id')
    @ApiParam({ type: Number, description: 'Integer Task Id', name: 'id', example: 21 })
    @ApiResponse({status: 200, type: DeleteTaskSuccessDto})
    deleteTask(@Param("id") id: number): Promise<DeleteTaskSuccessDto> {
        return this.taskService.deleteTask(id);
    }
}
