import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNewTaskBodyDto, AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';
import { Repository } from 'typeorm';
import { DeleteTaskSuccessDto } from '../dto/delete-task.dto';
import { ErrorKeys, ResponseErrorDto } from '../dto/error.dto';
import { GetBySearchQueryDto, GetBySearchResponseDto, Pagination_Data } from '../dto/get-by-search.dto';
import { UpdateDataBodyDto, UpdateDataSuccessDto } from '../dto/update-data.dto';
import { ObjectiveEntity } from '../entities/objective.entity';
import { TaskEntity } from '../entities/task.entity';
import { Like, MoreThanOrEqual, LessThanOrEqual, Between } from "typeorm";
import { GetTaskByIdResponseDto } from '../dto/get-task-by-id.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
        @InjectRepository(ObjectiveEntity) private objectiveEntity: Repository<ObjectiveEntity>,
    ) {}

    async getBySearch(query: GetBySearchQueryDto): Promise<GetBySearchResponseDto>{
        const tasks = await this.taskEntity.find({
            where: {
                Title: query.Title !== undefined ? Like(`${query.Title.toLowerCase()}`) : undefined,
                Action_Time: query.Action_Time_Start !== undefined  && query.Action_Time_End !== undefined ? Between(query.Action_Time_Start, query.Action_Time_End) : query.Action_Time_Start !== undefined ? MoreThanOrEqual(query.Action_Time_Start) : query.Action_Time_End !== undefined ? LessThanOrEqual(query.Action_Time_End) : undefined,
                Is_Finished: query.Is_Finished !== undefined ? query.Is_Finished : undefined,
            },
            relations: {
                Objective_List: true
            },
            take: query.Limit,
            skip: query.Page > 1 ? (query.Page * query.Limit) - query.Limit : 0,
        })

        // if(tasks.length === 0){
        //     throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        // }

        const totalAllData = await this.taskEntity.count();

        const paginationData = new Pagination_Data(
            query.Page,
            query.Limit,
            totalAllData
        )

        return new GetBySearchResponseDto(tasks, paginationData)
    }

    async addNewTask(data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto> {
        const newTask = await this.taskEntity.save({
            Title: data.Title,
            Action_Time: data.Action_Time,
            Created_Time: Math.floor(new Date().getTime() / 1000),
            Updated_Time: Math.floor(new Date().getTime() / 1000),
        })

        for(const objectiveName of data.Objective_List){
            await this.objectiveEntity.save({
                Task: newTask,
                Objective_Name: objectiveName
            })
        }

        return new AddNewTaskSuccessDto()
    }

    async getTaskById(id: number): Promise<GetTaskByIdResponseDto> {
        const task = await this.taskEntity.findOne({
            where: {
                Task_ID: id
            },
            relations: {
                Objective_List: true
            }
        })
        if (!task) {
            // TODO: Error model
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return new GetTaskByIdResponseDto(task);
    }

    async updateData(id: number, data: UpdateDataBodyDto): Promise<UpdateDataSuccessDto> {
        const task = await this.taskEntity.findOne({
            where: {
                Task_ID: id
            }
        })
        if (!task) {
            // TODO: Error model
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        await this.taskEntity.update(task,{
            Title: data.Title,
        })

        for(const objective of data.Objective_List){
            await this.objectiveEntity.save({
                Objective_ID: objective.Objective_ID,
                Objective_Name: objective.Objective_Name,
                Is_Finished: objective.Is_Finished,
                Task: task,
            })
        }

        const countIsFinished = await this.objectiveEntity.count({
            where: {
                Is_Finished: false,
                Task: task,
            }
        })

        if(countIsFinished === 0){
            await this.taskEntity.update(task,{
                Is_Finished: true,
            })
        }

        return new UpdateDataSuccessDto()

    }

    async deleteTask(id: number): Promise<DeleteTaskSuccessDto> {
        const task = await this.taskEntity.findOne({
            where: {
                Task_ID: id
            }
        })
        if (!task) {

        }
        await this.taskEntity.delete(task)

        return new DeleteTaskSuccessDto()
    }
}
