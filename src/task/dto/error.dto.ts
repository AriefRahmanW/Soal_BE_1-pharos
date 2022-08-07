import { ApiProperty } from '@nestjs/swagger';

// TODO: Add Error response dto

export enum ErrorKeys{
    ERROR_PARAM = 'error_param',
    ERROR_INTERNAL_SERVER = 'error_internal_server',
    ERROR_ID_NOT_FOUND = 'error_id_not_found'
}

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