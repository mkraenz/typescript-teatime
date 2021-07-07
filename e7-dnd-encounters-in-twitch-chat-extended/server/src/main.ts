import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number.parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  console.log(`server running on http://localhost:${port}`);
}
bootstrap();
