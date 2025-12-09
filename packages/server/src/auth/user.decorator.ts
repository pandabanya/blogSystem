import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 自定义装饰器，快速获取当前用户信息
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;  // 返回 JWT 解析后的用户信息
  },
);