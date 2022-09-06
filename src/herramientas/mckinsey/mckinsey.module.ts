import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { McKinsey, mcKinseySchema } from './mckinsey.schema';
import { MckinseyService } from './mckinsey.service';
import { MckinseyController } from './mckinsey.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: McKinsey.name, schema: mcKinseySchema },
    ]),
  ],
  providers: [MckinseyService],
  controllers: [MckinseyController],
  exports: [MckinseyService],
})
export class MckinseyModule {}
