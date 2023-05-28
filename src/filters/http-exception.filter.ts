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

    const exResp = exception.getResponse();
    const code = exception.getStatus() || 500;

    const { message: exMsg } = exception || {};
    const { message: exRespMsg = '' } = exResp || ({} as any);
    const message = exRespMsg || exMsg;

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
