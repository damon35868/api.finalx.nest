import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (result && result.code) {
          return {
            code: result.code,
            message: result.message,
            data: result.data,
          };
        }

        return {
          code: 200,
          data: result,
          message: 'request ok',
        };
      }),
    );
  }
}
