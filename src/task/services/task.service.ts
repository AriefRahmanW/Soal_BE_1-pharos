import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNewTaskBodyDto, AddNewTaskSuccessDto } from 'src/task/dto/add-new-task.dto';
import { Repository } from 'typeorm';
import { ResponseErrorDto } from '../dto/error.dto';
import { ObjectiveEntity } from '../entities/objective.entity';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity) private taskEntity: Repository<TaskEntity>,
        @InjectRepository(ObjectiveEntity) private objectiveEntity: Repository<ObjectiveEntity>,
    ) {}

    findAll(): Promise<TaskEntity[]> {
        return this.taskEntity.find();
    }

    addNewTask(data: AddNewTaskBodyDto): Promise<AddNewTaskSuccessDto> | Promise<ResponseErrorDto> {
        return new Promise(async (resolve, reject) => {
            this.taskEntity.save({
                Title: data.Title,
                Action_Time: new Date(data.Action_Time),
            }).then(async (newTask) => {

                data.Objective_List.forEach(async (objectiveName) => {
                    await this.objectiveEntity.save({
                        task: newTask,
                        Objective_Name: objectiveName
                    })
                })
            }).catch((error) => {
                reject({
                    message: 'Failed',
                    error_key: 'error_internal_server',
                    error_message: error.message,
                    error_data: {}
                })
            }).finally(() => {
                resolve({
                    message: 'Success'
                })
            })
            
        })
        
    }
}
