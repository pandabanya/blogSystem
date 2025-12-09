import { Body, Controller, Get, Post, Delete, Put, Param, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

/**
 * 评论控制器
 * 处理评论相关的 HTTP 请求
 */
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 发表评论（公开接口，无需登录）
   * POST /comment
   */
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    // 获取用户 IP 地址
    const ip = req.ip || req.connection.remoteAddress;
    return this.commentService.create(createCommentDto, ip);
  }

  /**
   * 获取文章的所有评论（公开接口）
   * GET /comment/article/:articleId
   */
  @Get('article/:articleId')
  findByArticleId(@Param('articleId') articleId: string) {
    return this.commentService.findByArticleId(articleId);
  }

  /**
   * 获取所有评论（管理员，需要登录）
   * GET /comment
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  /**
   * 删除评论（管理员，需要登录）
   * DELETE /comment/:id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  /**
   * 点赞评论（公开接口）
   * PUT /comment/:id/like
   */
  @Put(':id/like')
  like(@Param('id') id: string) {
    return this.commentService.like(id);
  }

  /**
   * 审核评论（管理员，需要登录）
   * PUT /comment/:id/approve
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id/approve')
  approve(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'rejected'
  ) {
    return this.commentService.approve(id, status);
  }
}
