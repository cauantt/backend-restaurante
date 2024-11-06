import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    observation: string;

    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product;

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    order: Order;
}
