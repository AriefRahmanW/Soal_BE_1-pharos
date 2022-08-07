import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNewTaskBodyDto, AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';
import { Repository } from 'typeorm';
import { DeleteTaskSuccessDto } from '../dto/delete-task.dto';
import { ErrorKeys, ResponseErrorDto } from '../dto/error.dto';
import { GetBySearchQueryDto, GetBySearchResponseDto } from '../dto/get-by-search.dto';
import { UpdateDataBodyDto, UpdateDataSuccessDto } from '../dto/update-data.dto';
import { ObjectiveEntity } from '../entities/objective.entity';
import { TaskEntity } from '../entities/task.entity';
import { Like } from "typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
        @InjectRepository(ObjectiveEntity) private objectiveEntity: Repository<ObjectiveEntity>,
    ) {}

    async getBySearch(query: GetBySearchQueryDto): Promise<GetBySearchResponseDto>{
        const tasks = await this.taskEntity.find({
            where: {
                Title: query.Title ? Like(`%${query.Title}%`) : undefined,
            },
            relations: {
                Objectives_List: true
            }
        })

        if(tasks.length === 0){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return new GetBySearchResponseDto(tasks)
    }

    async addNewTask(data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto> {
        const newTask = await this.taskEntity.save({
            Title: data.Title,
            Action_Time: data.Action_Time,
            Created_Time: Math.floor(new Date().getTime() / 1000),
            Updated_Time: Math.floor(new Date().getTime() / 1000),
        })
        data.Objective_List.forEach(async (objectiveName) => {
            await this.objectiveEntity.save({
                Task: newTask,
                Objective_Name: objectiveName
            })
        })

        return new AddNewTaskSuccessDto()
    }

    async getTaskById(id: number): Promise<TaskEntity> {
        const task = await this.taskEntity.findOne({
            where: {
                Task_ID: id
            },
            relations: {
                Objectives_List: true
            }
        })
        if (!task) {
            // TODO: Error model
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return task;
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

        data.Objective_List.forEach(async (objective) => {
            await this.objectiveEntity.save({
                Objective_ID: objective.Objective_ID,
                Objective_Name: objective.Objective_Name,
                Task: task,
            })
        })

        // TODO: Task Is_Finished = true while all objectives are finished
        await this.objectiveEntity.findAndCount({
            where: {
                Task: task,
                Is_Finished: true
            }
        })

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
