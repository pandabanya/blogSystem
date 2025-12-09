import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // GET /article - 获取所有文章（公开接口）
  @Get()
  findAllArticle() {
    return this.articleService.findAllArticle();
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