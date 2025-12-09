import { IsString, IsNotEmpty, IsArray, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';

// DTO = 数据传输对象，定义接口接收的数据格式
export class CreateArticleDto {
  @IsString({ message: '标题必须是字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  @MinLength(1, { message: '标题至少 1 个字符' })
  @MaxLength(100, { message: '标题最多 100 个字符' })
  title: string;

  @IsString({ message: '内容必须是字符串' })
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsString({ message: '作者必须是字符串' })
  @IsNotEmpty({ message: '作者不能为空' })
  author: string;

  @IsArray({ message: '标签必须是数组' })
  tags: string[];

  @IsOptional()  // 可选字段
  @IsString({ message: '状态必须是字符串' })
  @IsIn(['draft', 'published'], { message: '状态只能是 draft 或 published' })
  status?: string;
}