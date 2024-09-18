import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { storage } from './firebaseconfig'; 
import { extname } from 'path';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

@Injectable()
export class UploadsService {
  private readonly storage = storage; // Use the storage instance from your config

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Correct property name
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product> // Correct property name
  ) {}

  async handleFileUpload(file: Express.Multer.File, userId: number) {
    try {
      console.log(userId)
      const user = await this.usersRepository.findOneBy({ userId });
      if (!user) throw new NotFoundException('User not found');

      const fileName = `restaurante/perfil/${Date.now()}${extname(file.originalname)}`;
      const fileRef = ref(this.storage, fileName);

      if (!file.buffer) {
        throw new BadRequestException('File buffer is missing');
      }

      await uploadBytes(fileRef, file.buffer, {
        contentType: file.mimetype,
      });

      const publicUrl = await getDownloadURL(fileRef);

      user.path = publicUrl;
      await this.usersRepository.save(user);

      return { message: 'File uploaded successfully', fileUrl: publicUrl };
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new BadRequestException(`Error uploading file: ${error.message}`);
    }
  }


  async deleteProfilePicture(userId: number) {
    try {
      const user = await this.usersRepository.findOneBy({ userId });
      if (!user) throw new NotFoundException('User not found');
  
      if (user.path) {
        // Extrair o caminho do arquivo da URL
        const url = user.path;
        const decodedUrl = decodeURIComponent(url);
        const filePath = decodedUrl.split('/o/')[1]?.split('?')[0];
  
        if (!filePath) throw new BadRequestException('Failed to extract file path');
  
        console.log(`Decoded URL: ${decodedUrl}`);
        console.log(`File Path: ${filePath}`);
  
        const fileRef = ref(this.storage, filePath);
  
        // Verificar se o arquivo realmente existe antes de tentar deletar
        try {
          await getDownloadURL(fileRef);
          await deleteObject(fileRef); // Deleta o arquivo no Firebase Storage
        } catch (getError) {
          console.error('Error checking file existence:', getError.message);
          throw new BadRequestException('File does not exist');
        }
  
        // Atualiza o caminho da imagem para o avatar padrão com o formato completo
        const defaultAvatarUrl = 'https://firebasestorage.googleapis.com/v0/b/teste-d4080.appspot.com/o/twitter-novo-avatar-padrao-2017-bluebus.png?alt=media&token=1e69aca8-a6a0-4a6d-b4b3-365906fd26d9';
  
        // Atualizar o registro do usuário no banco de dados com o avatar padrão (URL completa)
        await this.usersRepository.update(user.userId, { path: defaultAvatarUrl });
  
        return { message: 'Profile picture deleted successfully, default avatar set' };
      } else {
        return { message: 'No profile picture to delete' };
      }
    } catch (error) {
      console.error('Error deleting profile picture:', error.message);
      throw new BadRequestException(`Error deleting profile picture: ${error.message}`);
    }
  }
  
  




  async getProfilePictureUrl(userId: number) {
    try {
      const user = await this.usersRepository.findOneBy({ userId });
      if (!user) throw new NotFoundException('User not found');

      return user.path || null;
    } catch (error) {
      throw new BadRequestException(`Error retrieving profile picture URL: ${error.message}`);
    }
  }

  async uploadProductImage(productId: number, file: Express.Multer.File) {
    try {
      const product = await this.productRepository.findOneBy({  productId }); // Ajuste conforme o nome do campo
      if (!product) throw new NotFoundException('Product not found');
  
      // Gere o nome do arquivo e o caminho no Firebase Storage
      const fileName = `restaurante/produtos/${Date.now()}${extname(file.originalname)}`;
      const fileRef = ref(this.storage, fileName);
  
      if (!file.buffer) {
        throw new BadRequestException('File buffer is missing');
      }
  
      await uploadBytes(fileRef, file.buffer, { contentType: file.mimetype });
      const publicUrl = await getDownloadURL(fileRef);
  
      // Atualize o produto com o novo caminho da imagem
      product.path = publicUrl;
      await this.productRepository.save(product);
  
      return { message: 'File uploaded and product updated successfully', fileUrl: publicUrl };
    } catch (error) {
      throw new BadRequestException(`Error uploading file: ${error.message}`);
    }
  }

  async deleteProductImage(productId: number) {
    try {
      // Check if productId is valid
      if (!productId) {
        throw new BadRequestException('Invalid or missing product ID');
      }
  
      console.log(`Product ID received: ${productId}`);
      
  
      // Query the product by ID
      const product = await this.productRepository.findOneBy({  productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      if (product.path) {
        const fileName = decodeURIComponent(product.path.split('/').pop()?.split('?')[0] || '');
        if (!fileName) {
          throw new BadRequestException('Failed to extract file name');
        }
  
        const filePath = `${fileName}`;
       
  
        const fileRef = ref(this.storage, filePath);
        await deleteObject(fileRef);
      } else {
        console.log('No file associated with the product.');
      }
  
      const defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/teste-d4080.appspot.com/o/twitter-novo-avatar-padrao-2017-bluebus.png?alt=media&token=1e69aca8-a6a0-4a6d-b4b3-365906fd26d9';
  
      // Update the product record with the default image URL
      const updateResult = await this.productRepository.update(productId, { path: defaultImageUrl });
 
  
      if (updateResult.affected === 0) {
        throw new BadRequestException('Product update failed');
      }
  
      return { message: 'Product image deleted successfully, default image set' };
    } catch (error) {
      console.error('Error deleting product image:', error.message);
      throw new BadRequestException(`Error deleting product image: ${error.message}`);
    }
  }
  

  
  async getProductImage(productId: number) {
    try {
      const product = await this.productRepository.findOneBy({ productId });
      if (!product) throw new NotFoundException('Product not found');

      return product.path || null;
    } catch (error) {
      throw new BadRequestException(`Error retrieving product image url ${error.message}`);
    }
  }
  
  
  
}
