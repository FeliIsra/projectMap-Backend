import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FodaController } from './foda.controller';
import { FODAPreSeedSchema, FODASchema } from './foda.schema';
import { FodaService } from './foda.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FODA', schema: FODASchema },
      {
        name: 'FODAPreSeed',
        schema: FODAPreSeedSchema,
      },
    ]),
  ],
  providers: [FodaService],
  controllers: [FodaController],
  exports: [FodaService],
})
export class FodaModule {}
