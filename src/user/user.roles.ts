import { User } from './user.schema';

export enum Roles {
  Free = 'Free',
  Premium = 'Premium',
  Consultant = 'Consultant',
  ConsultantAdmin = 'ConsultantAdmin',
}

export namespace Roles {
  export function isConsultor(user: User) {
    return user.role == Roles.Consultant || user.role == Roles.ConsultantAdmin;
  }
}
