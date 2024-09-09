import { Controller, Post, Delete, Get, Param, UploadedFile, BadRequestException, Req, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { Product } from 'src/products/entities/product.entity';

@Controller('upload')
export class UploadsController {
  constructor(private readonly fileUploadService: UploadsService) {}

  @Post('profile')
  @UseGuards(AuthGuard) 
  @UseInterceptors(FileInterceptor('file', multerOptions)) // Uses file interceptor
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const userId = req.user.sub;

    try {
      const result = await this.fileUploadService.handleFileUpload(file, userId);
      return { message: 'Profile picture uploaded and replaced successfully', imageUrl: result.fileUrl };
    } catch (error) {
      throw new BadRequestException(`Error uploading profile picture: ${error.message}`);
    }
  }

  @Delete('profile')
  @UseGuards(AuthGuard) // Add authentication guard
  async deleteProfile(
    @Req() req: any
  ) {
    const userId = req.user.sub;

    try {
      await this.fileUploadService.deleteProfilePicture(userId);
      return { message: 'Profile picture deleted successfully' };
    } catch (error) {
      throw new BadRequestException(`Error deleting profile picture: ${error.message}`);
    }
  }

  @Get('profile-url')
  @UseGuards(AuthGuard) // Add authentication guard
  async getProfileUrl(
    @Req() req: any
  ) {
    const userId = req.user.sub;

    try {
      const fileUrl = await this.fileUploadService.getProfilePictureUrl(userId);
      return { fileUrl };
    } catch (error) {
      throw new BadRequestException(`Error retrieving profile picture URL: ${error.message}`);
    }
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file')) // Assume multer options if any
  async uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('productId') productId: number
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
  
    try {
      const result = await this.fileUploadService.uploadProductImage(productId, file);
      return { message: 'File uploaded successfully', fileUrl: result.fileUrl };
    } catch (error) {
      throw new BadRequestException(`Error uploading file: ${error.message}`);
    }
  }


  @Delete('product')
  @UseGuards(AuthGuard) // Add authentication guard
  async deleteProductimg(
    @Body('productId') productId: number
  ) {
    

    try {

      const result = await this.fileUploadService.deleteProductImage(productId);
      return { message: 'Product image deleted successfully' };
    } catch (error) {
      throw new BadRequestException(`Error deleting product image: ${error.message}`);
    }
  }


  @Get('product-url')
  @UseGuards(AuthGuard) 
  async getProductImage(
    @Body('productId') productId: number
  ) {
    

    try {
      const fileUrl = await this.fileUploadService.getProductImage(productId);
      return { fileUrl };
    } catch (error) {
      throw new BadRequestException(`Error retrieving profile picture URL: ${error.message}`) ;
    }
  }
}
