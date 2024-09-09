import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Unique } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { hashSync } from 'bcrypt';
import { Role } from 'src/auth/role.enum';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

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

  @Column({default: "https://firebasestorage.googleapis.com/v0/b/teste-d4080.appspot.com/o/twitter-novo-avatar-padrao-2017-bluebus.png?alt=media&token=1e69aca8-a6a0-4a6d-b4b3-365906fd26d9"})
  path:string
  
  @Column({ type: 'int', default: Role.User })
  role: Role;

 
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];


  @OneToMany(() => Category, (category) => category.id)
  categories: Category[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
