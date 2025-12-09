import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

/**
 * 评论服务层
 * 处理评论的增删改查逻辑
 */
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}

  /**
   * 创建评论
   */
  async create(createCommentDto: CreateCommentDto, ip?: string) {
    const comment = new this.commentModel({
      ...createCommentDto,
      ip,
      status: 'approved' // 自动审核通过（可改为 'pending' 需要管理员审核）
    });
    
    const saved = await comment.save();
    
    return {
      code: 201,
      message: '评论成功',
      data: saved
    };
  }

  /**
   * 获取文章的所有评论（包括回复）
   */
  async findByArticleId(articleId: string) {
    // 只返回已审核通过的评论
    const comments = await this.commentModel
      .find({ articleId, status: 'approved' })
      .sort({ createdAt: -1 })
      .exec();

    // 构建评论树结构（顶级评论 + 子回复）
    const topComments = comments.filter(c => !c.parentId);
    const replies = comments.filter(c => c.parentId);

    const commentsWithReplies = topComments.map(comment => {
      const commentReplies = replies.filter(
        r => r.parentId?.toString() === comment._id.toString()
      );
      return {
        ...comment.toObject(),
        replies: commentReplies
      };
    });

    return {
      code: 200,
      message: 'success',
      data: commentsWithReplies
    };
  }

  /**
   * 获取所有评论（管理员使用，包括待审核）
   */
  async findAll() {
    const comments = await this.commentModel
      .find()
      .populate('articleId', 'title') // 关联文章信息
      .sort({ createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: comments
    };
  }

  /**
   * 删除评论（管理员）
   */
  async remove(id: string) {
    // 同时删除该评论的所有子回复
    await this.commentModel.deleteMany({ parentId: id }).exec();
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      return {
        code: 404,
        message: '评论不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '删除成功',
      data: null
    };
  }

  /**
   * 点赞评论
   */
  async like(id: string) {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // 点赞数 +1
      { new: true }
    ).exec();

    if (!comment) {
      return {
        code: 404,
        message: '评论不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '点赞成功',
      data: comment
    };
  }

  /**
   * 审核评论（管理员）
   */
  async approve(id: string, status: 'approved' | 'rejected') {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();

    if (!comment) {
      return {
        code: 404,
        message: '评论不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: `评论已${status === 'approved' ? '通过' : '拒绝'}`,
      data: comment
    };
  }
}
