import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity } from 'typeorm'
import { ObjectiveEntity } from './objective.entity';

@Entity({
    name: 'Task_Table'
})
export class TaskEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    Task_ID: number;

    @Column({
        type: 'varchar',
        length: '100'
    })
    Title: string;

    @Column({
        type: 'int',
    })
    Action_Time: number;

    @Column({
        type: 'boolean',
        default: false,
    })
    Is_Finished: boolean;

    @Column({
        type: 'int', 
        // default: () => new Date().getTime()
    })
    Created_Time: number;

    @Column({
        type: 'int', 
        // default: () => new Date().getTime()
    })
    Updated_Time: number;

    @OneToMany(() => ObjectiveEntity, (objective) => objective.Task)
    Objective_List: ObjectiveEntity[];
}