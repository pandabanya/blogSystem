import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 开源项目数据模型
 * 用于存储个人开源项目信息
 */
@Schema({ timestamps: true })  // 自动添加 createdAt 和 updatedAt 字段
export class Project extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;  // 项目名称

  @Prop({ required: true, maxlength: 200 })
  desc: string;  // 项目描述

  @Prop({ required: true })
  stars: string;  // Star 数量（如 "1.2k"）

  @Prop({ required: true })
  lang: string;  // 主要语言（如 "TypeScript"）

  @Prop({ required: true })
  icon: string;  // 项目图标（emoji）

  @Prop({ default: '' })
  url?: string;  // 项目链接（可选）

  @Prop({ default: 0 })
  sort: number;  // 排序权重，数字越大越靠前

  @Prop({ default: true })
  visible: boolean;  // 是否显示

  // timestamps: true 会自动生成这两个字段
  createdAt?: Date;
  updatedAt?: Date;
}

// 生成 Mongoose Schema
export const ProjectSchema = SchemaFactory.createForClass(Project);
