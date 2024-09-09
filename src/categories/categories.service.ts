import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(body: CreateCategoryDto, userId : number) {

    try {

      const userExists = await this.usersRepository.findOneBy({userId});

      if (!userExists) throw new NotFoundException("Usuario não encontrado!!")

      const exists = await this.repository.findOneBy({ category : body.category });

      if(exists) throw new NotFoundException("Essa categoria ja existe!");

  
      const category = this.repository.create(body);
      category.user = userExists

      return this.repository.save(body);

    }

    catch(error){

      console.log(error);

      return(error);
    }
}


async findAll(userId: number) {
  try {
    // Check if the user exists
    const userExists = await this.usersRepository.findOneBy({ userId });

    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    // Find all categories that belong to the user
    const categories = await this.repository.find({
      where: { user: { userId } },
      
    });

    return categories;  // Return the list of categories
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
}


  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
