import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

/**
 * 技能控制器
 */
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  // GET /skill - 获取所有可见技能（前台使用）
  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  // GET /skill/admin - 获取所有技能（后台管理使用）
  @Get('admin')
  findAllForAdmin() {
    return this.skillService.findAllForAdmin();
  }

  // GET /skill/:id - 获取单个技能
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  // POST /skill - 创建技能
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  // PUT /skill/:id - 更新技能
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto
  ) {
    return this.skillService.update(id, updateSkillDto);
  }

  // DELETE /skill/:id - 删除技能
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
