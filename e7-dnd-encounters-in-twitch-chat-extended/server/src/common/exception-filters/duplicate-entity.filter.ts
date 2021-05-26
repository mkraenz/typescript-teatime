import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DuplicateEntityException } from '../exceptions/duplicate-entity.exception';

//  [ExceptionsHandler] E11000 duplicate key error collection: typescriptteatime.adventurers index: username_1 dup key: { username: "testuser" }
@Catch(DuplicateEntityException)
export class DuplicateEntityFilter implements ExceptionFilter {
  catch(exception: DuplicateEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(422).json({
      statusCode: 422,
      timestamp: new Date().toISOString(),
      message: `Entity already exists for ${exception.message}`,
    });
  }
}
