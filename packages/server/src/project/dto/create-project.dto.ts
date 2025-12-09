import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

/**
 * 创建开源项目的数据传输对象
 * DTO (Data Transfer Object) 用于验证前端传来的数据
 * 面试重点：class-validator 装饰器的使用
 */
export class CreateProjectDto {
  @IsString({ message: '项目名称必须是字符串' })
  @IsNotEmpty({ message: '项目名称不能为空' })
  @MaxLength(100, { message: '项目名称不能超过100个字符' })
  name: string;

  @IsString({ message: '项目描述必须是字符串' })
  @IsNotEmpty({ message: '项目描述不能为空' })
  @MaxLength(200, { message: '项目描述不能超过200个字符' })
  desc: string;

  @IsString({ message: 'Star数量必须是字符串' })
  @IsNotEmpty({ message: 'Star数量不能为空' })
  stars: string;

  @IsString({ message: '编程语言必须是字符串' })
  @IsNotEmpty({ message: '编程语言不能为空' })
  lang: string;

  @IsString({ message: '图标必须是字符串' })
  @IsNotEmpty({ message: '图标不能为空' })
  icon: string;

  @IsOptional()
  @IsString({ message: '项目链接必须是字符串' })
  url?: string;

  @IsOptional()
  @IsNumber({}, { message: '排序必须是数字' })
  sort?: number;

  @IsOptional()
  @IsBoolean({ message: '可见性必须是布尔值' })
  visible?: boolean;
}
