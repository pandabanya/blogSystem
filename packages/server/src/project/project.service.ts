import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

/**
 * 开源项目服务层
 * 处理业务逻辑和数据库操作
 */
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  // 获取所有可见的项目列表（前台使用）
  async findAll() {
    const projects = await this.projectModel
      .find({ visible: true })  // 只返回可见的项目
      .sort({ sort: -1, createdAt: -1 })  // 按排序权重和创建时间倒序
      .exec();

    return {
      code: 200,
      message: 'success',
      data: projects
    };
  }

  // 获取所有项目（后台管理使用）
  async findAllForAdmin() {
    const projects = await this.projectModel
      .find()
      .sort({ sort: -1, createdAt: -1 })
      .exec();

    return {
      code: 200,
      message: 'success',
      data: projects
    };
  }

  // 根据 ID 获取单个项目
  async findOne(id: string) {
    const project = await this.projectModel.findById(id).exec();
    
    if (!project) {
      return {
        code: 404,
        message: '项目不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: 'success',
      data: project
    };
  }

  // 创建项目
  async create(createProjectDto: CreateProjectDto) {
    const newProject = new this.projectModel(createProjectDto);
    const saved = await newProject.save();

    return {
      code: 201,
      message: '创建成功',
      data: saved
    };
  }

  // 更新项目
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updated = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();

    if (!updated) {
      return {
        code: 404,
        message: '项目不存在',
        data: null
      };
    }

    return {
      code: 200,
      message: '更新成功',
      data: updated
    };
  }

  // 删除项目
  async remove(id: string) {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      return {
        code: 404,
        message: '项目不存在',
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
