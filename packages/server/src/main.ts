import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';  // 新增

// 入口文件（启动服务器）
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用 CORS（允许前端跨域请求）
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // 自动过滤掉 DTO 中未定义的属性
    forbidNonWhitelisted: true,
    transform: true //  自动转换类型（如字符串 "123" 转为数字 123）
  }))
  
  await app.listen(process.env.PORT ?? 3002);
  console.log(`🚀 Server is running on: http://localhost:3002`);
}
bootstrap();
