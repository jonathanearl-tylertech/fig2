import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identity } from 'src/schemas/identity.schema';

@Injectable()
export class IdentityMapperInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(mapEntityToDto());
  }
}

const mapEntityToDto = () => {
  return map(value => plainToInstance(Identity, value, { excludeExtraneousValues: true }))
}