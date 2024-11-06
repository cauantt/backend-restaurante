import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()




export class OrdersService {

  constructor(

    @InjectRepository(Order) private repository : Repository <Order>,
   
     
      @InjectRepository(User) private usersRepository: Repository<User>,
     
  


  ) {}

 async  create(body: CreateOrderDto) {

    const order = await this.repository.create(body)

    return await this.repository.save(order)
    
  }

  async findAll(userId :number ) {

    try {
    
     return await this.repository.find({

      where: {
        establishment: {
            userId: userId,
        },
    },
    relations: {
      address : true,
        customer: true,
        establishment: true,
        orderItems: {
            product: true, // Ensure you include the product relation here
        },
    },

     })
    } 

    catch(error){


      console.log(error)
    }
  



  }


  async findOne(userId: number) {
    const user = await this.usersRepository.findOneBy({ userId });

    if (!user) throw new NotFoundException("Usuário não encontrado!");

    // Obter todos os pedidos do usuário com as relações desejadas
    const orders = await this.repository.find({
        where: {
            customer: {
                userId: userId,
            },
        },
        relations: {
            customer: true,
            establishment: true,
            orderItems: {
                product: true, // Ensure you include the product relation here
            },
        },
    });

    // Função para agrupar pedidos por data de criação (somente a parte da data, ignorando a hora)
    const groupedOrders = orders.reduce((group, order) => {
        const date = order.createdAt.toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)
        if (!group[date]) {
            group[date] = [];
        }
        group[date].push(order);
        return group;
    }, {});

    return groupedOrders;
}

  

async update(id: number, updateOrderDto: UpdateOrderDto) {
  const order = await this.repository.findOneBy({ id });
  if (!order) {
      throw new NotFoundException(`Ordem com ID ${id} não encontrada`);
  }

  // Atualizar o status da ordem
  order.status = updateOrderDto.status; // Supondo que o DTO tenha um campo 'status'

  // Salvar a ordem atualizada
  return await this.repository.save(order);
}

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
