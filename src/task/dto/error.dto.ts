import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto{
    @ApiProperty({
        type: String,
        description: 'Error Message',
        example: 'Failed',
    })
    message: string;

    @ApiProperty({
        type: String,
        description: 'Error Key',
        example: 'error_param',
    })
    error_key: string;

    @ApiProperty({
        type: String,
        description: 'Error Message',
        example: 'Error representation in text',
    })
    error_message: string;

    @ApiProperty({
        type: String,
        description: 'Error Detail',
        example: 'Detail of an error',
    })
    error_data: any;
}