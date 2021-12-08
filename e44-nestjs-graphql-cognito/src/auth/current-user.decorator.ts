import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx).getContext();
    return gqlCtx.req.user;
  },
);

export type User = Required<Pick<JwtPayload, 'sub'>>;
