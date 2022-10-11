import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BalancedScorecard,
  BalanceScorecardSchema,
} from '../herramientas/balancedScorecard/balancedScorecard.schema';
import { BalancedScorecardService } from '../herramientas/balancedScorecard/balancedScorecard.service';
import { BalancedScorecardController } from '../herramientas/balancedScorecard/balancedScorecard.controller';
import { StickyNote, StickyNoteSchema } from './stickyNote.schema';
import { StickyNoteService } from './stickyNote.service';
import { StickyNoteController } from './stickyNote.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StickyNote.name, schema: StickyNoteSchema },
    ]),
  ],
  providers: [StickyNoteService],
  controllers: [StickyNoteController],
  exports: [StickyNoteService],
})
export class StickyNoteModule {}
