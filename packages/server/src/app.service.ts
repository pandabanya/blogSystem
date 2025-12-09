import { Injectable } from '@nestjs/common';

// 服务（业务逻辑） 包含实际的业务逻辑，可被多个控制器复用
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
