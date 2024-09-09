import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ProductsModule } from 'src/products/products.module'; // Import if necessary

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    forwardRef(() => ProductsModule), // Handle circular dependency
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadModule {}
