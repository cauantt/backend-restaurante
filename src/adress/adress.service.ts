import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto'; 
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private repository: Repository<Address>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(body: CreateAddressDto, userId: number) {
    // Find the user by userId
    const user = await this.usersRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
  
    // Create a new address and associate it with the user
    const address = this.repository.create({ ...body, user });
    return await this.repository.save(address);
  }
  
  

  async findByUserId(userId: number) { 
    try {
      console.log(userId)
      const addresses = await this.repository.find({
        where: {
            user: {
                userId: userId,
            },
        },
       
    });
      
      return addresses;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const address = await this.repository.findOne({ where: { id } });
      if (!address) {
        throw new NotFoundException("Endereço não encontrado!");
      }

      Object.assign(address, updateAddressDto); // Atualizando os dados do endereço
      return await this.repository.save(address);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const address = await this.repository.findOneBy({id});
      

      await this.repository.remove(address); 

      return("deletado com sucesso")
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
