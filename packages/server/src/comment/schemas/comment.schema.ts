import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * 评论数据模型
 * 支持文章评论和评论回复（嵌套评论）
 */
@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Article', required: true, index: true })
  // 关联的文章 ID（建立索引以加速查询）
  articleId: Types.ObjectId;

  @Prop({ required: true, maxlength: 50 })
  // 评论者昵称
  author: string;

  @Prop({ maxlength: 100 })
  // 评论者邮箱（可选，用于回复通知）
  email?: string;

  @Prop({ maxlength: 200 })
  // 评论者网站（可选）
  website?: string;

  @Prop({ required: true, maxlength: 500 })
  // 评论内容
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  // 父评论 ID（null 表示顶级评论，有值表示回复）
  parentId?: Types.ObjectId;

  @Prop({ default: 0 })
  // 点赞数
  likes: number;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  // 审核状态：待审核/已通过/已拒绝
  status: string;

  @Prop({ type: String })
  // IP 地址（用于防刷评论）
  ip?: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
