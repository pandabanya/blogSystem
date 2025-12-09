# 什么是 DTO？
DTO = Data Transfer Object（数据传输对象）

作用：

1. 定义接口接收的数据格式
2. 自动验证数据（类型、必填、长度等）
3. 提供类型提示（IDE 自动补全）
4. 类比：餐厅的点餐单，规定了客人必须填哪些信息（菜名、数量、备注），防止乱填。

```typescript
import { IsString, IsNotEmpty, IsArray, MinLength, MaxLength } from 'class-validator';

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
}
```