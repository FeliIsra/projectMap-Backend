import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PestelController } from './pestel.controller';
import { PESTELSchema } from './pestel.schema';
import { PestelService } from './pestel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PESTEL', schema: PESTELSchema }]),
  ],
  providers: [PestelService],
  controllers: [PestelController],
  exports: [PestelService],
})
export class PestelModule {}
