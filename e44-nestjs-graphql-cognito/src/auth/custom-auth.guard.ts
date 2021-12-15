import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// from https://docs.nestjs.com/security/authentication#graphql
@Injectable()
export class CustomAuthGuard extends AuthGuard('cognito-jwt') {
  getRequest(context: ExecutionContext) {
    const contextType = context.getType<GqlContextType>();
    if (contextType === 'http') {
      return context.switchToHttp().getRequest();
    }
    if (contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    throw new InternalServerErrorException('Unknown context type');
  }
}
