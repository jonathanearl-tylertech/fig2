import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Uname = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    
    const request = ctx.switchToHttp().getRequest();
    console.log({request});
    const { uid } = request.signedCookies;
    return uid;
  },
);