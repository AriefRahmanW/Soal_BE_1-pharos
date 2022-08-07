import { ApiProperty } from "@nestjs/swagger";
import { TaskEntity } from "../entities/task.entity";

export class GetTaskByIdResponseDto{
    @ApiProperty({
        type: String,
        description: 'Message',
        example: 'Success',
    })
    message: string;

    @ApiProperty({
        type: TaskEntity,
        description: 'Task Data',
        example: {
            "Task_ID": 21,
            "Title": "Grocery",
            "Action_Time": 1644944400, // UNIX
            "Created_Time": 1644998410, // UNIX
            "Updated_Time": 1644998410, // UNIX
            "Is_Finished": false, // INDIKATOR COMPLETED
            "Objective_List": [
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
        }    
    })
    data: TaskEntity;

    constructor(data: TaskEntity){
        this.message = 'Success';
        this.data = data;
    }
}