import { Body, Controller, Get, Post, Param, Put, Delete, Query, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { Resource } from './schemas/resource.schema';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from "@nestjs/passport"
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager"

@Controller('resource')
export class ResourceController {
    constructor(private resourceService: ResourceService){}

    @Get('getAll')
    @UseGuards(AuthGuard())
    async getAllResource(@Query() query: ExpressQuery): Promise<Resource[]>{
        return this.resourceService.findAll(query);
    }

    @Post('create')
    @UseGuards(AuthGuard())
    async createResource(
        @Body()
        resource: CreateResourceDto,
        @Req()
        req
    ): Promise<Resource> {
        return this.resourceService.create(resource, req.user)
    }
    
    @UseInterceptors(CacheInterceptor)
    @CacheKey('custom-key')
    @CacheTTL(10)
    @Get(':id')
    @UseGuards(AuthGuard())
    async getResourceById(
        @Param('id')
        id: String
    ): Promise<Resource>{
        return this.resourceService.findById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateResource(
        @Param('id')
        id: String,
        @Body()
        resource: UpdateResourceDto
    ): Promise<any>{
        return this.resourceService.update(id, resource)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteResource(
        @Param('id')
        id: String
    ): Promise<any>{
        return this.resourceService.delete(id)
    }
}
