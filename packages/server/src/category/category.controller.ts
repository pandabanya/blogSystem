import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 分类控制器
 * 处理分类相关的 HTTP 请求
 */
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 创建分类（需要登录）
   * POST /category
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * 获取所有分类（公开接口）
   * GET /category
   */
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  /**
   * 获取单个分类（公开接口）
   * GET /category/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  /**
   * 更新分类（需要登录）
   * PUT /category/:id
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * 删除分类（需要登录）
   * DELETE /category/:id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
