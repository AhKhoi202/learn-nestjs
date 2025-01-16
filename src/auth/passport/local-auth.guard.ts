import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    console.log('Guard activated'); // Log này sẽ in nếu Guard được kích hoạt
    return super.canActivate(context);
  }
}
