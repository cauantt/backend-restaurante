import { Injectable, NotFoundException, RawBody } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity'; 
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {

  
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async create(body: CreateProductDto, userId: number) {
    try {
      // Verifique se o usuário existe
      const userExists = await this.usersRepository.findOneBy({ userId });
      if (!userExists) {
        throw new NotFoundException("Usuário não encontrado!");
      }
  
      // Verifique se o produto já existe
      const productExists = await this.repository.findOneBy({ name: body.name });
      if (productExists) {
        throw new NotFoundException("Esse produto já existe!");
      }
  
      // Buscar a categoria pelo categoryId
      const categoryExists = await this.categoryRepository.findOneBy({ id: body.categoryId });
      if (!categoryExists) {
        throw new NotFoundException("Categoria não encontrada!");
      }
  
      // Criar o produto com os dados do body
      const product = this.repository.create({
        ...body,
        user: userExists,  // Associa o usuário ao produto
        category: categoryExists,  // Associa a categoria ao produto
      });
  
      // Salvar o produto
      return this.repository.save(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  

  async findAll(userId: number, categoryId: number) {
    try {
      // Check if the user exists
      const userExists = await this.usersRepository.findOneBy({ userId });
      if (!userExists) {
        throw new NotFoundException('Usuário não encontrado!');
      }
  
      // Check if the category exists
      const categoryExists = await this.categoryRepository.findOneBy({ id: categoryId });
      if (!categoryExists) {
        throw new NotFoundException('A categoria não foi encontrada!');
      }
  
      // Find products by user and category
      const products = await this.repository.find({
        where: {
          user: { userId },
          category: { id: categoryId },
        },
        relations: ['category'],
      });
  
      // Check if products were found
      if (!products || products.length === 0) {
        throw new NotFoundException('Nenhum produto encontrado para o usuário e categoria especificados.');
      }
  
      // Return the found products
      return products;
    } catch (error) {
      // Handle errors, either rethrow or log them
      throw error;
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
