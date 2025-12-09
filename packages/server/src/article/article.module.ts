
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // 新增
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article, ArticleSchema } from './schemas/article.schema';  // 新增

@Module({
  imports:[
    // 注册 Article 模型
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }
      //     ↑ 模型名称         ↑ 模型结构
    ])
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
