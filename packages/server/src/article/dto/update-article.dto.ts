import { IsString, IsOptional, IsArray, MinLength, MaxLength, IsIn } from 'class-validator';

// 更新时，所有字段都是可选的（用户可能只改标题，不改内容）
export class UpdateArticleDto {
  @IsOptional()  // 可选字段
  @IsString({ message: '标题必须是字符串' })
  @MinLength(1, { message: '标题至少 1 个字符' })
  @MaxLength(100, { message: '标题最多 100 个字符' })
  title?: string;

  @IsOptional()
  @IsString({ message: '内容必须是字符串' })
  content?: string;

  @IsOptional()
  @IsString({ message: '作者必须是字符串' })
  author?: string;

  @IsOptional()
  @IsArray({ message: '标签必须是数组' })
  tags?: string[];

  @IsOptional()
  @IsString({ message: '状态必须是字符串' })
  @IsIn(['draft', 'published'], { message: '状态只能是 draft 或 published' })
  status?: string;
}