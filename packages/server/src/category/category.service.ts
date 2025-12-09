import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

/**
 * 分类服务层
 * 处理分类的增删改查逻辑
 */
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  /**
   * 创建分类
   */
  async create(createCategoryDto: CreateCategoryDto) {
    // 检查分类名称是否已存在
    const existing = await this.categoryModel.findOne({ name: createCategoryDto.name }).exec();
    if (existing) {
      return {
        code: 400,
        message: '分类名称已存在',
        data: null
      };
    }

    // 如果没有提供 slug，自动从 name 生成
    if (!createCategoryDto.slug) {
      createCategoryDto.slug = createCategoryDto.name.toLowerCase().replace(/\s+/g, '-');
    }

    const category = new this.categoryModel(createCategoryDto);
    const saved = await category.save();

    return {
      code: 201,
      message: '创建成功',
      data: saved
    };
  }

  /**
   * 获取所有分类
   */
  async findAll() {
    const categories = await this.categoryModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: categories
    };
  }

  /**
   * 获取单个分类
   */
  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    
    if (!category) {
      return {
        code: 404,
        message: '分类不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: 'success',
      data: category
    };
  }

  /**
   * 更新分类
   */
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // 如果更新名称，检查是否重复
    if (updateCategoryDto.name) {
      const existing = await this.categoryModel.findOne({
        name: updateCategoryDto.name,
        _id: { $ne: id } // 排除当前分类
      }).exec();
      
      if (existing) {
        return {
          code: 400,
          message: '分类名称已存在',
          data: null
        };
      }
    }

    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();

    if (!updated) {
      return {
        code: 404,
        message: '分类不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '更新成功',
      data: updated
    };
  }

  /**
   * 删除分类
   */
  async remove(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    
    if (!category) {
      return {
        code: 404,
        message: '分类不存在',
        data: null
      };
    }

    // 如果该分类下有文章，不允许删除
    if (category.articleCount > 0) {
      return {
        code: 400,
        message: `该分类下还有 ${category.articleCount} 篇文章，不能删除`,
        data: null
      };
    }

    await this.categoryModel.findByIdAndDelete(id).exec();

    return {
      code: 200,
      message: '删除成功',
      data: null
    };
  }

  /**
   * 更新分类的文章数量
   */
  async updateArticleCount(categoryId: string, delta: number) {
    await this.categoryModel.findByIdAndUpdate(
      categoryId,
      { $inc: { articleCount: delta } }
    ).exec();
  }
}
