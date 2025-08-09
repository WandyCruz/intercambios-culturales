import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8081', 'http://192.168.100.7:8081'],
    methods: 'Post',
    credentials: true,
  });
  await app.listen(3001, '0.0.0.0');
}
void bootstrap();
