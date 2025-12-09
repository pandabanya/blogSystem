import { IsString, IsNotEmpty, IsOptional, MaxLength, IsBoolean } from 'class-validator';

/**
 * 创建分类的数据传输对象
 */
export class CreateCategoryDto {
  @IsString({ message: '分类名称必须是字符串' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  @MaxLength(50, { message: '分类名称最多50个字符' })
  // 分类名称
  name: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  @MaxLength(200, { message: '描述最多200个字符' })
  // 分类描述
  description?: string;

  @IsOptional()
  @IsString({ message: 'Slug必须是字符串' })
  @MaxLength(50, { message: 'Slug最多50个字符' })
  // URL别名
  slug?: string;

  @IsOptional()
  @IsBoolean({ message: '状态必须是布尔值' })
  // 是否启用
  isActive?: boolean;
}
