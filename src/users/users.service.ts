import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; 
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User) private repository : Repository <User>,


  ) {}

  async create( body: CreateUserDto) {

    try {

      const exists = await this.repository.findOneBy({email : body.email, enterprise: body.enterprise});

      if(exists) throw new NotFoundException(`O usuario  já existe!` );

      const user = await this.repository.create(body);
      return await this.repository.save(user);

    }

    catch (error) {
      console.log(error);
    }

  }

  async findAll() {
    
    try{

      return await this.repository.find({});



    }
    catch(error){

      console.log(error);
    }
  }

 
  
  

  async findOne(userId: number) {
    
    const exists = await this.repository.findOneBy({ userId })

    if(!exists)  throw new NotFoundException("Usuario não encontrado");

    return exists;

  }

  async findOne2(email: string) {
    return await this.repository.findOneBy({ email });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    
    const exists = await this.repository.findOneBy({userId})

    if(!exists) throw new NotFoundException("Usuario não encontrado");

    const user = await this.repository.update(userId, updateUserDto)
    return await this.repository.findOneBy({userId})


  }

  async remove(userId: number) {
    
    const exists = await this.repository.findOneBy({userId});

    if(!exists)  throw new NotFoundException("Usuario não encontrado!");

    const user = await this.repository.delete(userId);

    return "Usuario removido com sucesso";


  }
}
