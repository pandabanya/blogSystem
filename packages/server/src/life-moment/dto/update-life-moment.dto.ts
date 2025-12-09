import { PartialType } from '@nestjs/mapped-types';
import { CreateLifeMomentDto } from './create-life-moment.dto';

/**
 * 更新生活片段的 DTO
 * PartialType 使所有字段变为可选
 */
export class UpdateLifeMomentDto extends PartialType(CreateLifeMomentDto) {}
