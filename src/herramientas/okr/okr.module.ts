import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Okr, OkrProject, okrProjectSchema, okrSchema } from './okr.schema';
import { OkrService } from './okr.service';
import { OkrController } from './okr.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OkrProject.name, schema: okrProjectSchema },
    ]),
  ],
  providers: [OkrService],
  controllers: [OkrController],
  exports: [OkrService],
})
export class OkrModule {}
