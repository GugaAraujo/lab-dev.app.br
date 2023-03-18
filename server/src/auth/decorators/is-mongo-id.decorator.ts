import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

const mongoIdPattern = new RegExp("^[0-9a-fA-F]{24}$");

@Injectable()
export class MongoIdValidation implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    if (id && !mongoIdPattern.test(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return next.handle().pipe();
  }
}