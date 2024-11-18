import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AddressService } from './adress.service';
import { CreateAddressDto } from './dto/create-address.dto'; 
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AdressController {
  constructor(private readonly adressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Body('userId') userId: number) {
    return this.adressService.create(createAddressDto, userId);
  }
  
  

  @Get('/:userId')  // Corrigido para userId
findByUserId(@Param('userId') userId: number) {  // Corrigido para userId
  return this.adressService.findByUserId(userId); 
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
