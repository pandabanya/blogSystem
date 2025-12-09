import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })  // 唯一索引，防止用户名重复
  username: string;

  @Prop({ required: true })
  password: string;  // 加密后的密码

  @Prop({ default: 'user' })
  role: string;  // 角色：admin 或 user

  @Prop()
  avatar?: string;  // 头像（可选）
}

export const UserSchema = SchemaFactory.createForClass(User);