import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, BadRequestException, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  private readonly logger = new Logger(ProductsController.name);



  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,  // Recebe o DTO do produto
    @Body('userId') userId: number,  // Pega o userId do corpo da requisição
    @Body('categoryId') categoryId: number  // Pega o categoryId do corpo da requisição
  ) {
    // Adiciona o categoryId ao DTO e chama o serviço
    createProductDto['categoryId'] = categoryId;
    return this.productsService.create(createProductDto, userId);
  }

  
  @Get()
  findAll(
    @Query('userId') userId: number,
    @Query('categoryId') categoryId: number,
  ) {
    return this.productsService.findAll(userId, categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
