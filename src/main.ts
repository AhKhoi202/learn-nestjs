import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lấy ConfigService từ AppModule
  const configService = app.get(ConfigService);

  // Đặt tiền tố API
  app.setGlobalPrefix('api/v1', { exclude: [''] });

  // Lắng nghe port từ ConfigService hoặc giá trị mặc định
  const port = configService.get<number>('PORT') ?? 8000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
