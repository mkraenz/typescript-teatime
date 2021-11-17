import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = 3141;
  await app.listen(PORT);
  console.log(
    `Server running on http://localhost:${PORT} \n Graphql on http://localhost:${PORT}/graphql`,
  );
}
bootstrap();
