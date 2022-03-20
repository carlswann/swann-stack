import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 3000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
};

bootstrap();
