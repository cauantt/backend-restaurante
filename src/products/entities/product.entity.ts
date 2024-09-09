

import { Category } from "src/categories/entities/category.entity"
import { User } from "src/users/entities/user.entity" 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
    
    
    @PrimaryGeneratedColumn()
    productId : number

    @Column()
    name : string

    
    @Column()
    price : number

    

    @Column({default: "https://firebasestorage.googleapis.com/v0/b/teste-d4080.appspot.com/o/twitter-novo-avatar-padrao-2017-bluebus.png?alt=media&token=1e69aca8-a6a0-4a6d-b4b3-365906fd26d9"})
    path : string

    @ManyToOne(() => User, (user) => user.products, {onDelete: 'CASCADE'})
    user: User

    @ManyToOne(() => Category, (category) => category.products, {onDelete: 'CASCADE'})

    category  : Category;



    }
