import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Unique } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { hashSync } from 'bcrypt';
import { Role } from 'src/auth/role.enum';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Address } from 'src/adress/entities/adress.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @Column({ type: 'varchar', length: 255 })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Column()
  password: string;

  @IsNotEmpty({ message: 'Firstname cannot be empty' })
  @Column()
  enterprise: string;

  @Column()
  phone: string;



  @IsOptional()
  @Column({
    default: "cliente"
  })
  category: string;

  @IsOptional()
  @Column({
    default: "0"
  })
  deliveryTime: number;

  @IsOptional()
  @Column({
    default: "0"
  })
  deliveryPrice: string;

  @Column({
    default: "https://firebasestorage.googleapis.com/v0/b/teste-d4080.appspot.com/o/restaurante%2Fperfil%2Fdefault-avatar-icon-of-social-media-user-vector.jpg?alt=media&token=ec9d4fc8-120c-4594-b4d6-ebb157d6a622"
  })
  path: string;

  @Column({ type: 'int', default: Role.User })
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
