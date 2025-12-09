import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // 依赖注入

  @Get() // 装饰器：处理 GET 请求
  getHello(): string {
    return this.appService.getHello();   // 调用服务方法
  }
}
