import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceSchema } from './schemas/resource.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule ,MongooseModule.forFeature([{name: "Resource", schema: ResourceSchema}])],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export class ResourceModule {}
