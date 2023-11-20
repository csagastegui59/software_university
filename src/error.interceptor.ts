import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (process.env.LOG_UNHANDLED_ERRORS === 'true') {
          this.logError(error);
        }
        throw new Error(error);
      }),
    );
  }

  private logError(error: Error): void {
    fs.appendFile('errors.log', error.message + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }
}
