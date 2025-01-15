import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Đặt tiền tố API trước khi lắng nghe port
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
