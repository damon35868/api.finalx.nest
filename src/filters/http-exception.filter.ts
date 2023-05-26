import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { message } = exception;
    const code = exception.getStatus() || 500;

    Logger.log('错误提示', message);
    const errorResponse = {
      code,
      message,
      data: null,
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
