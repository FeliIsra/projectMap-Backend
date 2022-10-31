import { StickyNote } from '../sticky-notes/stickyNote.schema';
import { ProjectService } from '../project/project.service';
import { EmailNotification } from './EmailNotification';
import { PipelineStage } from 'mongoose';
import { Project } from '../project/project.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

export class NewStickyNoteNotification extends EmailNotification {
  stickyNote: StickyNote;
  project: Project;
  constructor(stickyNote: StickyNote, project: Project) {
    super();
    this.stickyNote = stickyNote;
    this.project = project;
    this.bodyText = `There is a new sticky note in your project: ${this.project.titulo}. Note:${stickyNote.text}`;
    this.subject = `New note!`;
  }

  async notifyUsers(destinations: string[]) {
    return Promise.all(
      destinations.map((destination) => super.send(destination)),
    );
  }
}
