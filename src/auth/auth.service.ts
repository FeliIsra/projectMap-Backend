import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: { email: string }) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '5m' });
  }

  async validateUser(payload: { email: string }) {
    return await this.userService.findByPayload(payload);
  }
}
