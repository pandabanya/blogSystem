import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // GET /article?page=1&pageSize=10 - 获取文章列表（支持分页）
  @Get()
  findAllArticle(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.articleService.findAllArticle(pageNum, size);
  }

  // GET /article/:id - 获取单篇文章（公开接口）
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  // POST /article - 创建文章（需要登录）
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: any
  ) {
    console.log('当前用户:', user);  // { userId, username, role }
    return this.articleService.create(createArticleDto);
  }

  // PUT /article/:id - 更新文章（需要登录）
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  // DELETE /article/:id - 删除文章（需要登录）
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}