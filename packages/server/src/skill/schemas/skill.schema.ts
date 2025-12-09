import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 技能标签数据模型
 * 用于存储个人技能栈信息
 */
@Schema({ timestamps: true })
export class Skill extends Document {
  @Prop({ required: true, maxlength: 50 })
  name: string;  // 技能名称（如 "Vue 3"）

  @Prop({ required: true })
  color: string;  // TailwindCSS 样式类（如 "bg-green-500/20 text-green-300 border border-green-500/30"）

  @Prop({ default: '' })
  category?: string;  // 技能分类（如 "前端框架"、"编程语言"）

  @Prop({ default: 0 })
  sort: number;  // 排序权重，数字越大越靠前

  @Prop({ default: true })
  visible: boolean;  // 是否显示

  @Prop({ default: '' })
  icon?: string;  // 图标（可选，如 emoji 或图标类名）

  // timestamps: true 会自动生成
  createdAt?: Date;
  updatedAt?: Date;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
