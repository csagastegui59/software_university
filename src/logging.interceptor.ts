import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        if (process.env.LOG_RESPONSE_TIME === 'true') {
          this.logResponseTime(request.method, request.url, responseTime);
        }
      }),
    );
  }

  private logResponseTime(
    method: string,
    url: string,
    responseTime: number,
  ): void {
    const logMessage = `${method} ${url} - Response time: ${responseTime}ms\n`;

    fs.appendFile('response-times.log', logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }
}
