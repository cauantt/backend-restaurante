import { IsEnum, IsOptional } from "class-validator";
import { Role } from "src/auth/role.enum";

export class CreateUserDto {


    email : string;

    password: string;

    phone : string

    enterprise : string;

    @IsOptional()
    category : string;

    @IsOptional()
    deliveryTime : number;
    

    @IsOptional()
    deliveryPrice : string;


    @IsEnum (Role)
    @IsOptional()
    role?: number;

    @IsOptional()
    path : string

    
  
}
