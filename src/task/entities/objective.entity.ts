import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity({
    name: 'Objective_Table'
})
export class ObjectiveEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    Objective_ID: number;

    @Column({
        type: 'varchar',
        length: '100'
    })
    Objective_Name: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    Is_Finished: boolean;

    @ManyToOne(() => TaskEntity, (task) => task.Objectives_List)
    Task: TaskEntity;

}