import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';

// 根模块（组织应用结构）  将控制器和服务组合在一起，形成功能模块。
@Module({
  imports: [
    // 连接MongoDB
    MongooseModule.forRoot('mongodb+srv://blogadmin:rcveBElZvp4yMQiH@cluster0.ha3neqp.mongodb.net/blog?appName=Cluster0'),
    // 业务模块
    ArticleModule,
    AuthModule,
    CommentModule, // 评论模块
    CategoryModule // 分类模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
