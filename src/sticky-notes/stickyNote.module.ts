import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StickyNote, StickyNoteSchema } from './stickyNote.schema';
import { StickyNoteService } from './stickyNote.service';
import { StickyNoteController } from './stickyNote.controller';
import { ProjectModule } from '../project/project.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StickyNote.name, schema: StickyNoteSchema },
    ]),
    ProjectModule,
    UserModule,
  ],
  providers: [StickyNoteService],
  controllers: [StickyNoteController],
  exports: [StickyNoteService],
})
export class StickyNoteModule {}
