import { IsEnum, IsOptional } from "class-validator";
import { Role } from "src/auth/role.enum";

export class CreateUserDto {


    email : string;

    password: string;

    enterprise : string;

    @IsEnum (Role)
    @IsOptional()
    role?: number;

    @IsOptional()
    path : string
  
}
