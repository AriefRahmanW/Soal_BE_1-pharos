import { ApiProperty } from "@nestjs/swagger";
import { ObjectiveEntity } from "../entities/objective.entity";

export class UpdateDataBodyDto{
    @ApiProperty({
        type: String,
        description: 'Task Title',
        example: 'Task Monday 25 Updated (Grandma req)',
    })
    Title: string;

    @ApiProperty({
        type: [ObjectiveEntity],
        description: 'Objective List',
        example: [
            {
                "Objective_Name": "Buy New Work Chair",
                "Is_Finished": true // INDIKATOR CHECKED
            },
            {
                "Objective_Name": "Pre-Order new TV",
                "Is_Finished": true
            },
            {
                "Objective_Name": "Buy new Gardening Set",
                "Is_Finished": false
            },
            {
                "Objective_Name": "Buy 4-8 new pot",
                "Is_Finished": false
            }
        ]    
    })
    Objective_List: ObjectiveEntity[];
}

export class UpdateDataSuccessDto{
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