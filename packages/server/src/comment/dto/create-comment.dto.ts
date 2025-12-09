import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength, IsMongoId } from 'class-validator';

/**
 * 创建评论的数据传输对象
 * 用于验证前端传来的评论数据
 */
export class CreateCommentDto {
  @IsMongoId({ message: '文章ID格式不正确' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  // 文章 ID
  articleId: string;

  @IsString({ message: '昵称必须是字符串' })
  @IsNotEmpty({ message: '昵称不能为空' })
  @MaxLength(50, { message: '昵称最多50个字符' })
  // 评论者昵称
  author: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @MaxLength(100, { message: '邮箱最多100个字符' })
  // 邮箱（可选）
  email?: string;

  @IsOptional()
  @IsString({ message: '网站必须是字符串' })
  @MaxLength(200, { message: '网站地址最多200个字符' })
  // 网站（可选）
  website?: string;

  @IsString({ message: '评论内容必须是字符串' })
  @IsNotEmpty({ message: '评论内容不能为空' })
  @MaxLength(500, { message: '评论内容最多500个字符' })
  // 评论内容
  content: string;

  @IsOptional()
  @IsMongoId({ message: '父评论ID格式不正确' })
  // 父评论 ID（回复评论时使用）
  parentId?: string;
}
