import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { Skill, SkillSchema } from './schemas/skill.schema';

/**
 * 技能模块
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema }
    ])
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService]
})
export class SkillModule {}
