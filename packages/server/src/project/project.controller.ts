import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

/**
 * 开源项目控制器
 * 定义 RESTful API 路由
 * 
 * 面试重点：
 * 1. RESTful API 设计规范
 * 2. NestJS 装饰器的使用（@Controller、@Get、@Post 等）
 * 3. 路由参数、请求体的处理
 */
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // GET /project - 获取所有可见项目（前台使用）
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  // GET /project/admin - 获取所有项目（后台管理使用）
  @Get('admin')
  findAllForAdmin() {
    return this.projectService.findAllForAdmin();
  }

  // GET /project/:id - 获取单个项目
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  // POST /project - 创建项目
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  // PUT /project/:id - 更新项目
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  // DELETE /project/:id - 删除项目
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
