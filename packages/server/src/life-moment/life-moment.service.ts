import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LifeMoment } from './schemas/life-moment.schema';
import { CreateLifeMomentDto } from './dto/create-life-moment.dto';
import { UpdateLifeMomentDto } from './dto/update-life-moment.dto';

/**
 * 生活片段服务层
 */
@Injectable()
export class LifeMomentService {
  constructor(
    @InjectModel(LifeMoment.name) private lifeMomentModel: Model<LifeMoment>
  ) {}

  // 获取所有可见的生活片段（前台使用）
  async findAll() {
    const moments = await this.lifeMomentModel
      .find({ visible: true })
      .sort({ sort: -1, createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: moments
    };
  }

  // 获取所有生活片段（后台管理使用）
  async findAllForAdmin() {
    const moments = await this.lifeMomentModel
      .find()
      .sort({ sort: -1, createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: moments
    };
  }

  // 根据 ID 获取单个生活片段
  async findOne(id: string) {
    const moment = await this.lifeMomentModel.findById(id).exec();
    
    if (!moment) {
      return {
        code: 404,
        message: '生活片段不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: 'success',
      data: moment
    };
  }

  // 创建生活片段
  async create(createLifeMomentDto: CreateLifeMomentDto) {
    const newMoment = new this.lifeMomentModel(createLifeMomentDto);
    const saved = await newMoment.save();

    return {
      code: 201,
      message: '创建成功',
      data: saved
    };
  }

  // 更新生活片段
  async update(id: string, updateLifeMomentDto: UpdateLifeMomentDto) {
    const updated = await this.lifeMomentModel
      .findByIdAndUpdate(id, updateLifeMomentDto, { new: true })
      .exec();

    if (!updated) {
      return {
        code: 404,
        message: '生活片段不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '更新成功',
      data: updated
    };
  }

  // 删除生活片段
  async remove(id: string) {
    const result = await this.lifeMomentModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      return {
        code: 404,
        message: '生活片段不存在',
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
