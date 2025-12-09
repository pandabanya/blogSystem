import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';

/**
 * 更新技能的 DTO
 * PartialType 使所有字段变为可选
 */
export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
