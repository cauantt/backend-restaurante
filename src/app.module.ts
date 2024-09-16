import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { UploadModule } from './uploads/uploads.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'restaurante',
      entities: [User,Product,Category],
      synchronize: true,
    }), UsersModule, AuthModule, ProductsModule,UploadModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


  
}
