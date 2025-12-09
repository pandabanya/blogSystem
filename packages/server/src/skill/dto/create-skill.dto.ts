import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

/**
 * 创建技能的数据传输对象
 */
export class CreateSkillDto {
  @IsString({ message: '技能名称必须是字符串' })
  @IsNotEmpty({ message: '技能名称不能为空' })
  @MaxLength(50, { message: '技能名称不能超过50个字符' })
  name: string;

  @IsString({ message: '颜色样式必须是字符串' })
  @IsNotEmpty({ message: '颜色样式不能为空' })
  color: string;

  @IsOptional()
  @IsString({ message: '分类必须是字符串' })
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: '排序必须是数字' })
  sort?: number;

  @IsOptional()
  @IsBoolean({ message: '可见性必须是布尔值' })
  visible?: boolean;

  @IsOptional()
  @IsString({ message: '图标必须是字符串' })
  icon?: string;
}
