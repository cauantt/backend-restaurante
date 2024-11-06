import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
 
export class CreateProductDto {

    

    name : string;

    price : number;
    
    description : string;

    storage : number

    categoryId : number;

    userId: number;

  


    @IsOptional()
    path: string;

    



}
