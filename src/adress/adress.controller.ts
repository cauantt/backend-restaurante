import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AddressService } from './adress.service';
import { CreateAddressDto } from './dto/create-address.dto'; 
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AdressController {
  constructor(private readonly adressService: AddressService) {}

  @Post()
  create(@Body() createAdressDto: CreateAddressDto, @Body('userId') userId: number) {
    return this.adressService.create(createAdressDto, userId);
  }

  @Get()
  findAll() {
    return this.adressService.findAll();
  }

  @Get('/:userId') // Alterado para pegar o userId como parâmetro de rota
  findByUserIdfindOne(@Param('id') id: number) { // Mudou o nome do método para refletir o que faz
    return this.adressService.findByUserId(id); // Chama o serviço passando o userId
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAddressDto) {
    return this.adressService.update(+id, updateAdressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.remove(+id);
  }
}
