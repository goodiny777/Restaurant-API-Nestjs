import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({ type: VersioningType.URI })

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
