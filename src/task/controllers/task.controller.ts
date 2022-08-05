import { Controller, Get, Post, Body } from '@nestjs/common';
import { 
    AddNewTaskBodyDto, 
    AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';

import { TaskService } from '../services/task.service';
import { ApiTags, ApiBody, ApiResponse} from '@nestjs/swagger'
import { ResponseErrorDto } from '../dto/error.dto';

ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('get')
    getAllTask(): Promise<any> {
        return this.taskService.findAll();
    }

    @Post('add')
    @ApiBody({ type: AddNewTaskBodyDto})
    @ApiResponse({status: 200, type: AddNewTaskSuccessDto})
    @ApiResponse({status: 400, type: ResponseErrorDto})
    addNewTask(@Body() data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto | ResponseErrorDto> {
        return this.taskService.addNewTask(data);
    }
}
