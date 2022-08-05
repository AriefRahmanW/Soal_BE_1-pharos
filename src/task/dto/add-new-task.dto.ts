import { ApiProperty } from '@nestjs/swagger';

export class AddNewTaskBodyDto{
    @ApiProperty({
        type: String,
        description: 'Task Title',
        example: 'Fresh New Year',
    })
    Title: string;

    @ApiProperty({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Action_Time: number;

    @ApiProperty({
        type: [String],
        description: 'Objective Name',
        example: [
            "Bike",
            "Jog at park",
            "Lunch",
            "Laundry & Cleaning",
            "Netflix"
        ]
    })
    Objective_List: string[];
}

export class AddNewTaskSuccessDto{
    @ApiProperty({
        type: String,
        description: 'Message',
        example: 'Success',
    })
    message: string;
}