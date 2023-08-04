import { IsEmpty, IsOptional, IsString } from 'class-validator'
import { User } from 'src/auth/schemas/user.schema';

export class UpdateResourceDto{

    @IsOptional()
    @IsString()
    readonly name: String;

    @IsOptional()
    @IsString()
    readonly secondKey: String;

    @IsOptional()
    @IsString()
    readonly thirdKey: String;

    @IsEmpty({message: "user field must be empty"})
    readonly user: User

}