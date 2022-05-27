import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (
          typeof data === 'object' &&
          'data' in data &&
          ('message' in data || 'code' in data)
        ) {
          return {
            code: data['code'] || 0,
            data: data['data'],
            message: data['message'] || '请求成功',
          };
        } else {
          return {
            code: 0,
            data,
            message: '请求成功',
          };
        }
      }),
    );
  }
}
