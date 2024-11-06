import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    district: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    complement: string;

    @ManyToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Order, (order) => order.address) // Adicione esta linha
    orders: Order[]; // Adicione esta linha
}