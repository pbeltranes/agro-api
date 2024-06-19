import { NestApplication, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    AppModule,
    // adapter,
  );
  const config = new DocumentBuilder()
    .setTitle('Agro API')
    .setDescription('The agro API description')
    .setVersion('beta')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4001);
}
bootstrap();
