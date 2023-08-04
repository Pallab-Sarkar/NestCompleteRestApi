import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter valid email address"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    readonly password: string;

}