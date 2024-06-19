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

  const port = 8080; // Puedes cambiar el puerto si es necesario
  await app.listen(port);
  
  console.clear();
  // Log para mostrar el puerto en la consola
  console.info(`\n\n\n\n\n 🚀 Application is running on: http://localhost:${port}/api \n\n\n`);
}

bootstrap();