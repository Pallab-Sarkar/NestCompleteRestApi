import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}>{

        const { name, email, password} = signUpDto

        const getUser = await this.userModel.findOne({ email: email})
        if(getUser){
            throw new UnauthorizedException("User already exist, Please change email !")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id})
        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string}>{

        const { email, password} = loginDto

        const user = await this.userModel.findOne({ email: email})

        if(!user){
            throw new UnauthorizedException("User not exist")
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            throw new UnauthorizedException("Invalid Password")
        }

        const token = this.jwtService.sign({ id: user._id})
        return { token }

    }
}
