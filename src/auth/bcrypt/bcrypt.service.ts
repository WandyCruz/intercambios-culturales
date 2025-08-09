import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class BcryptService {
  private readonly saltos = 15;

  async hashpassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltos);
  }

  async compararPassword(
    password: string,
    paswordHasheada: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, paswordHasheada);
  }
}
