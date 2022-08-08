import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskEntity } from "../entities/task.entity";
import { Type, Transform } from "class-transformer";
import { IsNumber, IsNotEmpty } from "class-validator";

export class Pagination_Data{
    Current_Page: number;

    Max_Data_Per_Page: number;

    Max_Page: number;

    Total_All_Data: number;

    constructor(currentPage: number, maxDataPerPage: number, totalAllData: number){
        this.Current_Page = currentPage;
        this.Max_Data_Per_Page = maxDataPerPage;
        this.Total_All_Data = totalAllData;
        this.Max_Page = Math.ceil(totalAllData / maxDataPerPage);
    }
}

class List_Data{
    List_Data: TaskEntity[]

    Pagination_Data: Pagination_Data

    constructor(List_Data: TaskEntity[], Pagination_Data: Pagination_Data){
        this.List_Data = List_Data;
        this.Pagination_Data = Pagination_Data
    }
}

export class GetBySearchQueryDto{
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'Viewed Page',
        example: 1,
    })
    Page: number;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Page Limit',
        example: 1,
    })
    Limit: number;

    @ApiPropertyOptional({
        type: String,
        description: 'Task Title',
        example: 'Task Monday 25',
    })
    Title: string = undefined;

    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Action_Time_Start: number = undefined;

    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        description: 'Unix Timestamp',
        example: 1640970000,
    })
    Action_Time_End: number = undefined;

    @Transform(value => value.toString() === 'true' ? true : value.toString() === 'false' ? false : undefined)
    @ApiPropertyOptional({
        type: Boolean,
        description: 'Is Finished',
        example: false,
    })
    Is_Finished: boolean = undefined;
}

export class GetBySearchResponseDto{
    @ApiProperty({
        type: String,
        description: 'Message',
        example: 'Success',
    })
    message: string;

    @ApiProperty({
        type: List_Data,
        description: 'Task List',
        example: {
            "List_Data": [
                {
                    "Task_ID": 23,
                    "Title": "Pick Up Nia ( 6pm )",
                    "Action_Time": 1644944400, // UNIX
                    "Created_Time": 1644998579, // UNIX
                    "Updated_Time": 1644998788, // UNIX
                    "Is_Finished": false, // INDIKATOR COMPLETED
                    "Objective_List": [
                        {
                            "Objective_Name": "Pickup at Retronova Building 5th Floor",
                            "Is_Finished": false // INDIKATOR CHECKED
                        },
                        {
                            "Objective_Name": "Go for Dinner",
                            "Is_Finished": false
                        },
                        {
                            "Objective_Name": "Stop By Ikea for Cat Things",
                            "Is_Finished": false
                        }
                    ]
                },
                {
                    "Task_ID": 24,
                    "Title": "Watch Chelsea vs Manchaster ( 11:30pm )",
                    "Action_Time": 1644944400,
                    "Created_Time": 1644998650,
                    "Updated_Time": 1644998650,
                    "Is_Finished": false,
                    "Objective_List": [
                        {
                            "Objective_Name": "Finish the assignment before",
                            "Is_Finished": false
                        }
                    ]
                }
            ],
            "Pagination_Data": {
                "Current_Page": 1, // PAGE YANG DI AKSES
                "Max_Data_Per_Page": 20, // TOTAL MAX DATA PER PAGE
                "Max_Page": 1, // MAX PAGE YANG BISA DI AKSES
                "Total_All_Data": 4 // TOTAL SEMUA DATA
            }
        }
    })
    data: List_Data

    constructor(data: TaskEntity[], paginationData: Pagination_Data){
        this.message = 'Success';
        this.data = new List_Data(data, paginationData);
    }
}