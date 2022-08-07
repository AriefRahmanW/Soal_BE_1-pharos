import { ApiProperty } from "@nestjs/swagger";
import { ObjectiveEntity } from "../entities/objective.entity";

export class GetTaskByIdResponseDto{
    @ApiProperty({
        type: Number,
        description: 'Task Id',
        example: 1,
    })
    Task_ID: number;

    @ApiProperty({
        type: String,
        description: 'Task Title',
        example: 'Task Monday 25',
    })
    Title: string;

    @ApiProperty({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Action_Time: Number;

    @ApiProperty({
        type: Boolean,
        description: 'Is Finished',
        example: false,
    })
    Is_Finished: boolean;

    @ApiProperty({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Created_Time: Number;

    @ApiProperty({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Updated_Time: Number;

    @ApiProperty({
        type: [ObjectiveEntity],
        description: 'Objective List',
        example: [
            {
                "Objective_Name": "Milk 2lt",
                "Is_Finished": false // INDIKATOR CHECKED
            },
            {
                "Objective_Name": "Spoon set",
                "Is_Finished": false
            },
            {
                "Objective_Name": "Mineral Water 2btl",
                "Is_Finished": false
            },
            {
                "Objective_Name": "Some Snack",
                "Is_Finished": false
            }
        ]
    })
    Objectives_List: ObjectiveEntity[];
}