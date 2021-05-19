import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

//  [ExceptionsHandler] E11000 duplicate key error collection: typescriptteatime.adventurers index: username_1 dup key: { username: "testuser" }
@Catch(Error)
export class DuplicateEntityFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    if (exception.message.includes('E11000 duplicate key error')) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.status(422).json({
        statusCode: 422,
        timestamp: new Date().toISOString(),
        message: `Entity already exists for ${JSON.stringify(
          (exception as any).keyValue,
        )}`,
      });
    }
  }
}
