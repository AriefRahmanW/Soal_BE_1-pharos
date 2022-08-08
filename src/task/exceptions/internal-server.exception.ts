import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorKeys, ResponseErrorDto } from '../dto/error.dto';

@Catch(InternalServerErrorException)
export class InternalServerExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(200)
      // you can manipulate the response here
      .json(new ResponseErrorDto(ErrorKeys.ERROR_INTERNAL_SERVER, exception.message));
  }
}