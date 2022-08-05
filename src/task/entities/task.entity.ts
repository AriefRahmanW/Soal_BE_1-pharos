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
        type: 'date',
    })
    Action_Time: Date;

    @Column({
        type: 'boolean',
        default: false,
    })
    Is_Finished: boolean;

    @CreateDateColumn({
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    Created_Time: Date;

    @CreateDateColumn({
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    Updated_Time: Date;

    @OneToMany(() => ObjectiveEntity, (objective) => objective.task)
    objectives: ObjectiveEntity[];
}