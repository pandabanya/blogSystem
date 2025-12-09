import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 文章分类数据模型
 * 独立的分类管理，与标签(tags)区分
 */
@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true, maxlength: 50 })
  // 分类名称（唯一）
  name: string;

  @Prop({ maxlength: 200 })
  // 分类描述
  description?: string;

  @Prop({ maxlength: 50 })
  // 分类别名/slug（用于 URL）
  slug?: string;

  @Prop({ default: 0 })
  // 该分类下的文章数量
  articleCount: number;

  @Prop({ default: true })
  // 是否启用
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
