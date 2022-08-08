import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorKeys, ResponseErrorDto } from '../dto/error.dto';

@Catch(BadRequestException)
export class QueryParamExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(200)
      // you can manipulate the response here
      .json(new ResponseErrorDto(ErrorKeys.ERROR_PARAM, exception.message));
  }
}