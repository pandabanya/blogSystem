import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LifeMomentService } from './life-moment.service';
import { CreateLifeMomentDto } from './dto/create-life-moment.dto';
import { UpdateLifeMomentDto } from './dto/update-life-moment.dto';

/**
 * 生活片段控制器
 */
@Controller('life-moment')
export class LifeMomentController {
  constructor(private readonly lifeMomentService: LifeMomentService) {}

  // GET /life-moment - 获取所有可见生活片段（前台使用）
  @Get()
  findAll() {
    return this.lifeMomentService.findAll();
  }

  // GET /life-moment/admin - 获取所有生活片段（后台管理使用）
  @Get('admin')
  findAllForAdmin() {
    return this.lifeMomentService.findAllForAdmin();
  }

  // GET /life-moment/:id - 获取单个生活片段
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lifeMomentService.findOne(id);
  }

  // POST /life-moment - 创建生活片段
  @Post()
  create(@Body() createLifeMomentDto: CreateLifeMomentDto) {
    return this.lifeMomentService.create(createLifeMomentDto);
  }

  // PUT /life-moment/:id - 更新生活片段
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLifeMomentDto: UpdateLifeMomentDto
  ) {
    return this.lifeMomentService.update(id, updateLifeMomentDto);
  }

  // DELETE /life-moment/:id - 删除生活片段
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lifeMomentService.remove(id);
  }
}
