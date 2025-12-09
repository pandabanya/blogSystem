import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';  // 新增
import { Model } from 'mongoose';  // 新增
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schemas/article.schema';  // 新增

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>
    //  ↑ 注入 Article 模型
  ) {}

  // 获取文章列表（支持分页和搜索）
  async findAllArticle(page: number = 1, pageSize: number = 10, keyword?: string) {
    // 计算跳过的文档数量
    const skip = (page - 1) * pageSize;
    
    // 构建搜索条件
    const filter: any = {};
    if (keyword) {
      // 使用正则表达式进行模糊搜索，不区分大小写
      filter.title = { $regex: keyword, $options: 'i' };
    }
    
    // 查询文章列表和总数
    const [articles, total] = await Promise.all([
      this.articleModel.find(filter)
        .sort({ createdAt: -1 })  // 按创建时间倒序
        .skip(skip)
        .limit(pageSize)
        .exec(),
      this.articleModel.countDocuments(filter).exec()  // 总数
    ]);
    
    return {
      code: 200,
      message: 'success',
      data: {
        list: articles,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }

  // 根据 ID 获取单篇文章
  async findOne(id: string) {
    const article = await this.articleModel.findById(id).exec();
    //                      ↑ 根据 _id 查询
    if (!article) {
      return {
        code: 404,
        message: '文章不存在',
        data: null
      };
    }
    return {
      code: 200,
      message: 'success',
      data: article
    };
  }

  // 创建文章
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = new this.articleModel(createArticleDto);
    //                 ↑ 创建文档实例
    const saved = await newArticle.save();
    //                  ↑ 保存到数据库
    return {
      code: 201,
      message: '创建成功',
      data: saved
    };
  }

  // 更新文章
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const updated = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      //                                         ↑ 返回更新后的文档
      .exec();
    
    if (!updated) {
      return {
        code: 404,
        message: '文章不存在',
        data: null
      };
    }
    return {
      code: 200,
      message: '更新成功',
      data: updated
    };
  }

  // 删除文章
  async remove(id: string) {
    const result = await this.articleModel.findByIdAndDelete(id).exec();
    if (!result) {
      return {
        code: 404,
        message: '文章不存在',
        data: null
      };
    }
    return {
      code: 200,
      message: '删除成功',
      data: null
    };
  }

  // 获取文章统计数据
  async getStats() {
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews
    ] = await Promise.all([
      this.articleModel.countDocuments().exec(),  // 总文章数
      this.articleModel.countDocuments({ status: 'published' }).exec(),  // 已发布
      this.articleModel.countDocuments({ status: 'draft' }).exec(),  // 草稿
      this.articleModel.aggregate([  // 总浏览量
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]).exec()
    ]);

    return {
      code: 200,
      message: 'success',
      data: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalViews: totalViews[0]?.total || 0
      }
    };
  }

  // 导出文章为 Markdown 格式
  async exportArticle(id: string) {
    const article = await this.articleModel.findById(id).exec();
    
    if (!article) {
      return {
        code: 404,
        message: '文章不存在',
        data: null
      };
    }

    // 生成 Markdown 前言（Front Matter）
    const frontMatter = `---
title: ${article.title}
author: ${article.author}
date: ${article?.createdAt || ''}
tags: ${article.tags.join(', ')}
status: ${article.status}
views: ${article.views}
---

`;

    // 完整的 Markdown 内容
    const markdown = frontMatter + article.content;

    return {
      code: 200,
      message: 'success',
      data: {
        title: article.title,
        content: markdown,
        filename: `${article.title.replace(/[^\w\s-]/g, '')}.md`
      }
    };
  }
}