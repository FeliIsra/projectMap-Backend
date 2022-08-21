import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PorterController } from './porter.controller';
import { Porter, porterSchema } from './porter.schema';
import { PorterService } from './porter.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Porter.name, schema: porterSchema }]),
  ],
  providers: [PorterService],
  controllers: [PorterController],
  exports: [PorterService],
})
export class PorterModule {}
