import { ApiProperty } from "@nestjs/swagger";

export class DeleteTaskSuccessDto{
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