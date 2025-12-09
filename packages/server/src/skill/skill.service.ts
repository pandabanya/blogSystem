import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

/**
 * 技能服务层
 */
@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<Skill>
  ) {}

  // 获取所有可见的技能（前台使用）
  async findAll() {
    const skills = await this.skillModel
      .find({ visible: true })
      .sort({ sort: -1, createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: skills
    };
  }

  // 获取所有技能（后台管理使用）
  async findAllForAdmin() {
    const skills = await this.skillModel
      .find()
      .sort({ sort: -1, createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: skills
    };
  }

  // 根据 ID 获取单个技能
  async findOne(id: string) {
    const skill = await this.skillModel.findById(id).exec();
    
    if (!skill) {
      return {
        code: 404,
        message: '技能不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: 'success',
      data: skill
    };
  }

  // 创建技能
  async create(createSkillDto: CreateSkillDto) {
    const newSkill = new this.skillModel(createSkillDto);
    const saved = await newSkill.save();

    return {
      code: 201,
      message: '创建成功',
      data: saved
    };
  }

  // 更新技能
  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const updated = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .exec();

    if (!updated) {
      return {
        code: 404,
        message: '技能不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '更新成功',
      data: updated
    };
  }

  // 删除技能
  async remove(id: string) {
    const result = await this.skillModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      return {
        code: 404,
        message: '技能不存在',
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
