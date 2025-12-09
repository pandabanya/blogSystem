import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 继承 Passport 的 JWT 守卫
  // 'jwt' 对应 JwtStrategy 的名称
}