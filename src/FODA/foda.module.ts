import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FodaController } from './foda.controller';
import { FODASchema } from './foda.schema';
import { FodaService } from './foda.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FODA', schema: FODASchema }])],
  providers: [FodaService],
  controllers: [FodaController],
  exports: [],
})
export class FodaModule {}
