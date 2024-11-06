import { IsOptional } from "class-validator";
import { Address } from "src/adress/entities/adress.entity";
import { OrderItem } from "src/order-items/entities/order-item.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    status: string;

    @Column()
    total: number;

    @Column()
    delivery: boolean;

    @Column()
    payment: string;

    
   @Column({ nullable: true, default: 0 })
   @IsOptional()
   changeMoney: number;



    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    customer: User;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    establishment: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    orderItems: OrderItem[];

    @ManyToOne(() => Address, (address) => address.orders, { onDelete: 'SET NULL' }) 
    address: Address; 


}