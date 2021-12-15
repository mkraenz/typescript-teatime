import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

// from https://docs.nestjs.com/security/authentication#graphql
@Injectable()
export class CustomAuthGuard extends AuthGuard('cognito-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

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

  canActivate(context: ExecutionContext) {
    const ctx = this.getTypeSpecificContext(context);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  private getTypeSpecificContext(context: ExecutionContext) {
    const contextType = context.getType<GqlContextType>();
    if (contextType === 'http') {
      return context;
    }
    if (contextType === 'graphql') {
      return GqlExecutionContext.create(context);
    }
    throw new InternalServerErrorException('Unknown context type');
  }
}
