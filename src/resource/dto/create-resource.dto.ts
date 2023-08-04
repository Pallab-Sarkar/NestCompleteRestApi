import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";


export class CreateResourceDto{

    @IsNotEmpty()
    @IsString()
    readonly name: String;

    @IsNotEmpty()
    @IsString()
    readonly secondKey: String;

    @IsNotEmpty()
    @IsString()
    readonly thirdKey: String;

    @IsEmpty({ message: "user field must be empty"})
    readonly user: User

}