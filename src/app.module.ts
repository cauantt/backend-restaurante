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
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderItem } from './order-items/entities/order-item.entity';
import { Order } from './orders/entities/order.entity';
import { AdressModule } from './adress/adress.module';
import { Address } from './adress/entities/adress.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'restaurante',
      entities: [User,Product,Category,OrderItem,Order,Address],
      synchronize: true,
    }), UsersModule, AuthModule, ProductsModule,UploadModule, CategoriesModule, OrdersModule, OrderItemsModule, AdressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


  
}
