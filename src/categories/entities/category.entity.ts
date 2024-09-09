import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    category : string

    
    @ManyToOne(() => User, (user) => user.categories,  {onDelete: 'CASCADE'})
    user : User

    @OneToMany(() => Product, (product) => product.productId)
    products: Product[];



}
