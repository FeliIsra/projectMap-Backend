import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FodaController } from './foda.controller';
import { FodaService } from './foda.service';
import { FODASchema } from './foda.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FODA', schema: FODASchema }])],
  providers: [FodaService],
  controllers: [FodaController],
  exports: [FodaService],
})
export class FodaModule {}
