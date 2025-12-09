import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

/**
 * 分类模块
 * 整合分类相关的所有组件
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema }
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService] // 导出供其他模块使用
})
export class CategoryModule {}
