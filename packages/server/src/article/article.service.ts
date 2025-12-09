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

  // 获取所有文章
  async findAllArticle() {
    const articles = await this.articleModel.find().exec();
    //                      ↑ 查询所有文档
    return {
      code: 200,
      message: 'success',
      data: articles
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
}