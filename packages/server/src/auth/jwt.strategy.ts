import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // 从请求头的 Authorization 字段提取 Token
      ignoreExpiration: false,  // 不忽略过期 Token
      secretOrKey: 'your-secret-key-change-in-production',  // 密钥（必须和 auth.module.ts 中的一致）
    });
  }

  // 验证通过后，这个方法会被调用，返回的数据会自动注入到 request.user 中
  async validate(payload: any) {
    return { 
      userId: payload.userId, 
      username: payload.username,
      role: payload.role
    };
  }
}