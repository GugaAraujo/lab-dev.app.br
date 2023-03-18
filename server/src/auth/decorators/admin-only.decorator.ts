import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AdminOnly implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user.role !== 'ADMIN') {
      throw new HttpException('User does not have privileges for this action', HttpStatus.FORBIDDEN);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
