import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

/**
 * 更新项目的 DTO
 * PartialType 使所有字段变为可选
 * 面试重点：NestJS 内置的 PartialType 工具类使用
 */
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
