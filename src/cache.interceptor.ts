import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const key = this.trackBy(context);
    const cachedValue = this.cacheService.get(key);

    if (cachedValue) {
      return of(cachedValue);
    }

    return next.handle().pipe(
      tap((response) => {
        this.cacheService.set(key, response);
      }),
    );
  }

  trackBy(context: ExecutionContext): string {
    const httpAdapter = context.switchToHttp();
    const request = httpAdapter.getRequest();

    return request.url;
  }
}
