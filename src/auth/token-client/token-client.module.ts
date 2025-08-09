import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenClientService } from './token-client.service';

@Module({
  imports: [
    ConfigModule, // Importa ConfigModule para que ConfigService esté disponible
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importar ConfigModule aquí también para inyección
      inject: [ConfigService], // Inyecta ConfigService en la fábrica
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('clave_secret_token'), // Lee la variable de entorno
        signOptions: { expiresIn: '7h' }, // Opcional: expiración de token
      }),
    }),
  ],
  providers: [TokenClientService],
  exports: [TokenClientService],
})
export class TokenClientModule {}
