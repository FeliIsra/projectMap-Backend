import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BalancedScorecard,
  BalanceScorecardSchema,
} from './balancedScorecard.schema';
import { BalancedScorecardService } from './balancedScorecard.service';
import { BalancedScorecardController } from './balancedScorecard.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalancedScorecard.name, schema: BalanceScorecardSchema },
    ]),
  ],
  providers: [BalancedScorecardService],
  controllers: [BalancedScorecardController],
  exports: [BalancedScorecardService],
})
export class BalancedScorecardModule {}
