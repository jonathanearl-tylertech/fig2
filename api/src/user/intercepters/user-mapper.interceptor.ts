import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserMapperInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(mapEntityToDto());
  }
}

const mapEntityToDto = () => {
  return map((value) =>
    plainToInstance(User, value, { excludeExtraneousValues: true }),
  );
};
