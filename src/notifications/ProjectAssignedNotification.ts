import { EmailNotification } from './EmailNotification';
import { Project } from '../project/project.schema';

export class ProjectAssignedNotification extends EmailNotification {
  project: Project;
  constructor(project: Project) {
    super();
    this.project = project;
    this.bodyText = `You have been assigned a new project: ${this.project.titulo}!`;
    this.subject = `New Project Assigned!`;
  }

  async notifyUsers(destinations: string[]) {
    return Promise.all(
      destinations.map((destination) => super.send(destination)),
    );
  }
}
