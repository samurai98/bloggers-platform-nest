import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

type ErrorInfo = {
  statusCode: number;
  error: string;
  message: ErrorMessage[];
};

export type ErrorMessage = { message: string; field: string };
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorInfo = exception.getResponse() as ErrorInfo;

    if (typeof errorInfo === 'object' && Array.isArray(errorInfo.message))
      response
        .status(status)
        .json({ errorsMessages: errorInfo.message.map(({ message, field }) => ({ message, field })) });
    else response.status(status).json({ statusCode: status });
  }
}
