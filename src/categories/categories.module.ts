import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Category]),
  ],
  providers: [CategoriesService],  // Ensure this line exists
  controllers: [CategoriesController],
  exports: [CategoriesService],  // Export it if you need to use it in other modules
})
export class CategoriesModule {}

