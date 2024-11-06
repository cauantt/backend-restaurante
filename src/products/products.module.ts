import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User,Category,OrderItem]),
  ],
  controllers : [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
