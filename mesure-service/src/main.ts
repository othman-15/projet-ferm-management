import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS (si ton frontend Angular est sur un autre port)
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  });

  // Validation automatique des DTOs
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Supprime les propriétés non définies dans le DTO
        forbidNonWhitelisted: true, // Rejette les requêtes avec propriétés inconnues
        transform: true, // Transforme automatiquement les types
      }),
  );

  // Configuration Swagger
  const config = new DocumentBuilder()
      .setTitle('Microservice Mesure - API')
      .setDescription(
          'API REST pour la gestion des mesures capteurs dans le système de gestion agricole',
      )
      .setVersion('1.0')
      .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Entrer le token JWT obtenu depuis Keycloak',
            in: 'header',
          },
          'JWT', // Nom de référence pour ApiBearerAuth
      )
      .addTag('Mesures', 'Gestion des mesures capteurs')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);

  console.log(`🚀 Microservice Mesure démarré sur le port ${port}`);
  console.log(`📚 Documentation Swagger : http://localhost:${port}/api`);
}

bootstrap();