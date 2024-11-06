import { Body, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class OrderItemsService {


  constructor(

    @InjectRepository(OrderItem) private repository : Repository <OrderItem>,
    @InjectRepository(Product) private productRepository : Repository <Product>,


  ) {}


  async create(body: CreateOrderItemDto) {
    try {
      
        const product = await this.repository.create(body)

        return await this.repository.save(product)


    } catch (error) {
      console.error("Error creating order item:", error);
      throw new Error("Failed to create order item");
    }
  }
  

  findAll() {
    return `This action returns all orderItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
