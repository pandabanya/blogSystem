import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 继承 Document，让这个类具备 Mongoose 文档的特性（如 save()、remove()）
@Schema({ timestamps: true })  // 自动添加 createdAt 和 updatedAt 字段
export class Article extends Document {
  @Prop({ required: true, maxlength: 100, index: true })  // 添加 index: true
  //                                         ↑ 为 title 创建索引
  title: string;

  @Prop({ required: true })  // 必填
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], default: [] })  // 数组类型，默认为空数组
  tags: string[];

  @Prop({ default: 0 })  // 默认值为 0
  views: number;
}

// 生成 Mongoose Schema
export const ArticleSchema = SchemaFactory.createForClass(Article);