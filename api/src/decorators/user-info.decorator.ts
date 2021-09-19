import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

interface UserClaims {
  _id: string;
}

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserClaims;
  },
);