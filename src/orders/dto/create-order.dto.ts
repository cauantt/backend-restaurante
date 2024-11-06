// src/orders/dto/create-order.dto.ts

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Address } from 'src/adress/entities/adress.entity'; 
import { User } from 'src/users/entities/user.entity'; 
import { OrderItem } from 'src/order-items/entities/order-item.entity'; 

export class CreateOrderDto {
    @IsString()
    status: string;

    @IsNumber()
    total: number;

    @IsBoolean()
    delivery: boolean;

    
    userId: number; 

    establishmentId: number; 

    
    orderItems: OrderItem[]; 

    address: Address; 

    
    payment : string;

    @IsOptional()
    changeMoney :  number
  
}
