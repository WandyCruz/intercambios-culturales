import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  pais: string;
  @IsString()
  idioma: string;
}
