import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schemas/project.schema';

/**
 * 开源项目模块
 * 将 Controller、Service 和 Schema 组织在一起
 * 
 * 面试重点：
 * 1. NestJS 模块化设计
 * 2. MongooseModule.forFeature 的使用
 * 3. 依赖注入（DI）原理
 */
@Module({
  imports: [
    // 注册 Project 模型到 MongoDB
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema }
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]  // 导出 Service 供其他模块使用
})
export class ProjectModule {}
