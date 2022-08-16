export interface UserDTO {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
}
