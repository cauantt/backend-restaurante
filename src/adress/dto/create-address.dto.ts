import { User } from "src/users/entities/user.entity"

export class CreateAddressDto {


    street : string

    number : number

    district : string

    state : string

    city : string

    complement : string

    user : User



}
