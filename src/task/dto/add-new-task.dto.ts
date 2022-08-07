import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray } from 'class-validator';

export class AddNewTaskBodyDto{
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Task Title',
        example: 'Fresh New Year',
    })
    Title: string;

    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Action_Time: number;

    @IsArray()
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

    constructor(){
        this.message = 'Success';
    }
}