import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  
  constructor(
    
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Category) private repository: Repository<Category>,
    

  ) {}

  async create(body: CreateCategoryDto, userId: number) {
    try {
        // Check if the user exists
        const userExists = await this.usersRepository.findOneBy({userId });

        if (!userExists) {
            throw new NotFoundException("Usuario não encontrado!!");
        }

        // Check if the category already exists
        const exists = await this.repository.findOneBy({ category: body.category });

        if (exists) {
            throw new ConflictException("Essa categoria já existe!");
        }

        // Create the category object
        const category = this.repository.create(body);
        category.user = userExists; // Set the user reference

        // Save the category object
        return await this.repository.save(category);

    } catch (error) {
        console.error('Error creating category:', error);
        throw new InternalServerErrorException('An error occurred while creating the category.');
    }
}


async findAll(userId: number) {
  try {
      // Check if the user exists
      const userExists = await this.usersRepository.findOneBy({  userId }); // Make sure the field is correctly referenced

      if (!userExists) {
          throw new NotFoundException("User not found");
      }

      // Find all categories that belong to the user
      const categories = await this.repository.find({
          where: { user: {  userId } }, // Make sure the relationship and field name are correct
      });

      return categories;  // Return the list of categories
  } catch (error) {
      console.log(error);
      throw new Error("Error fetching categories");
  }
}

  async findOne(id: number) {

    try {
    
    const category = await this.repository.findOneBy({id})

    if(!category) throw new NotFoundException("Categoria não encontrada");

    return category

    return}

    catch(error){

      console.log(error)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    
    try {
    
      const category = await this.repository.findOneBy({id})
  
      if(!category) throw new NotFoundException("Categoria não encontrada");

      const newCategory = await this.repository.update(id,updateCategoryDto)

      return await this.repository.findOneBy({id})

      
  
     
  
      }
  
      catch(error){
  
        console.log(error)
      }
    
  }

  async remove(id: number) {
    try{

      const exists = await this.repository.findOneBy({id})

      if(!exists) throw new NotFoundException("Categoria não encontrada")

      await this.repository.delete(id);

      return ("Categoria excluida com sucesso!")



    }

    catch(error){
      console.log(error)
    }
  }
}
