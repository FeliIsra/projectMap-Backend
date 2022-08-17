import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FodaModule } from 'src/FODA/foda.module';
import { PestelModule } from 'src/PESTEL/pestel.module';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    FodaModule,
    PestelModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [],
})
export class ProjectModule {}
