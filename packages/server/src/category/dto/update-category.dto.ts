import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

/**
 * 更新分类的数据传输对象
 * 所有字段都是可选的
 */
export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: '分类名称必须是字符串' })
  @MaxLength(50, { message: '分类名称最多50个字符' })
  name?: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  @MaxLength(200, { message: '描述最多200个字符' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Slug必须是字符串' })
  @MaxLength(50, { message: 'Slug最多50个字符' })
  slug?: string;

  @IsOptional()
  @IsBoolean({ message: '状态必须是布尔值' })
  isActive?: boolean;
}
