import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenClientService {
  constructor(private readonly jwtService: JwtService) {}

  async GenerateToken(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
