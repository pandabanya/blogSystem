import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

/**
 * 创建生活片段的数据传输对象
 */
export class CreateLifeMomentDto {
  @IsString({ message: 'Emoji必须是字符串' })
  @IsNotEmpty({ message: 'Emoji不能为空' })
  emoji: string;

  @IsString({ message: '标签必须是字符串' })
  @IsNotEmpty({ message: '标签不能为空' })
  @MaxLength(100, { message: '标签不能超过100个字符' })
  label: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @IsOptional()
  @IsString({ message: '图片链接必须是字符串' })
  imageUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: '排序必须是数字' })
  sort?: number;

  @IsOptional()
  @IsBoolean({ message: '可见性必须是布尔值' })
  visible?: boolean;
}
