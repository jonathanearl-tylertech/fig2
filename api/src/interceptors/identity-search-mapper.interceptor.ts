import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentitySearchResultDto } from 'src/dtos/identity-search.dto';
import { Identity } from 'src/schemas/identity.schema';

@Injectable()
export class IdentitySearchMapperInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(mapResultToDto());
  }
}

const mapResultToDto = () => {
  return map((value: Identity[]) => {
    const result = value.map((i) =>
      plainToInstance(Identity, i, { excludeExtraneousValues: true }),
    );
    const count = result.length;
    const response: IdentitySearchResultDto = { result, count };
    return response;
  });
};
