import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Resource } from './schemas/resource.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
import { User } from 'src/auth/schemas/user.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name)
        private resourceModel: mongoose.Model<Resource>,
        @Inject(CACHE_MANAGER) private cacheService: Cache
    ){}

    //For getting all the data from data base
    //implemented pagination
    async findAll(query: Query): Promise<Resource[]> {

        const dataPerPage = Number(query.limit) || 20
        const pages = Number(query.page) || 1
        const skip = dataPerPage * (pages - 1)

        const searchTerm = query.searchTerm ? {
            name: {
                $regex: query.searchTerm,
                $options: 'i'
            }
        } : {}

        const resources = await this.resourceModel.find({...searchTerm}).limit(dataPerPage).skip(skip);

        return resources;
    }

    //Creating data in database
    async create(resource: Resource, user: User): Promise<Resource>{

        const data = Object.assign(resource, { user: user._id})
        const res = await this.resourceModel.create(resource);
        return res;
    }

    //Getting single data using id
    async findById(id: String): Promise<Resource>{

        const cachedData = await this.cacheService.get<{ name: string, secondKey: String, thirdKey: String, user, _id }>(
            id.toString(),
          );

          if (cachedData) {
            return cachedData;
          }

        //validating object id
        const isValidId = mongoose.isValidObjectId(id)
        if(!isValidId){
            throw new BadRequestException('Please enter a valid id!')
        }
        const res = await this.resourceModel.findById({_id : id});
        if(!res){
            throw new NotFoundException("Resource not found!")
        }

        await this.cacheService.set(id.toString(), res)
        return res;
    }
    
    //updating the data
    async update(id: String, resource: Resource): Promise<any>{

        return await this.resourceModel.findByIdAndUpdate(id, resource, {
            new: true,
            runValidators: true
        });
    }

    //Delete data
    async delete(id: String): Promise<Resource>{

        return await this.resourceModel.findByIdAndDelete(id);
    }
}
