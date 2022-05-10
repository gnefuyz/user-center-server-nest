import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

function getExceptionMessage(exception: HttpException): string {
  const status = exception.getStatus();
  let message = exception.message || 'Client Error';
  if (status === 400) {
    const response = exception.getResponse();
    if (typeof response === 'object') {
      // handle SwaggerException
      if ('message' in response) {
        if (response['message'] instanceof Array) {
          message = response['message'].pop();
        } else {
          message = response['message'];
        }
      }
    } else {
      message = response;
    }
  } else if (status >= 500) {
    message = 'Service Error';
  }

  return message;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response 对象
    const status = exception.getStatus(); // 获取异常状态码
    const errorResponse = {
      data: null,
      message: getExceptionMessage(exception),
      code: -1,
    };
    response.status(status);
    response.header('Content-Type', 'application/json;charset=utf-8');
    response.send(errorResponse);
  }
}

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response 对象
    const errorResponse = {
      data: null,
      message: exception.message,
      code: -1,
    };
    response.send(errorResponse);
  }
}
