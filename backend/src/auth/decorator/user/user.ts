import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserLogged } from 'src/auth/types/user-logged';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserLogged => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
