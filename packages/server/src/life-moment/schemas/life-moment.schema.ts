import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 生活片段数据模型
 * 用于存储个人生活瞬间、爱好等信息
 */
@Schema({ timestamps: true })
export class LifeMoment extends Document {
  @Prop({ required: true })
  emoji: string;  // 表情图标

  @Prop({ required: true, maxlength: 100 })
  label: string;  // 标签文字（如"我家的猫"）

  @Prop({ default: '' })
  description?: string;  // 详细描述（可选）

  @Prop({ default: '' })
  imageUrl?: string;  // 图片链接（可选）

  @Prop({ default: 0 })
  sort: number;  // 排序权重

  @Prop({ default: true })
  visible: boolean;  // 是否显示

  // timestamps: true 会自动生成
  createdAt?: Date;
  updatedAt?: Date;
}

export const LifeMomentSchema = SchemaFactory.createForClass(LifeMoment);
