import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';

/**
 * 评论模块
 * 整合评论相关的所有组件
 */
@Module({
  imports: [
    // 注册 Comment 模型到 MongoDB
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema }
    ])
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService] // 导出 Service，供其他模块使用
})
export class CommentModule {}
