import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('Bootstrap');

    const app = await NestFactory.create(AppModule);

    // Configuration globale
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') || 8082;

    // ⭐ SWAGGER MINIMAL - juste pour tester
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API Biologiste')
        .setDescription('API de gestion des biologistes')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1aXBOZVJCQXhuUjFxeklGWTlfMUlGOUNWcTdkOUxPdDdxaXVpbk5ERTVNIn0.eyJleHAiOjE3NjcwMzA0NzQsImlhdCI6MTc2NzAzMDE3NCwianRpIjoib25ydHJvOjNjNDNmYmZmLTUyYWQtZGJiZS03YjBkLTFmYTQwMjRmNzA4NCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvRnBsLWZlcm1lLW1hbmFnZW1lbnQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmUyMzM2YTctZTViZS00Yjg0LTk1MTctMThhYTMzYTdiMWJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiRnBsLWZlcm1lLWNsaWVudCIsInNpZCI6IjY1YmQ3YjdjLTc4NjItNjg4Ny05NWVjLWFlMzdkNmZjZGMwOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgyIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtZnBsLWZlcm1lLW1hbmFnZW1lbnQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlVTRVIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ1c2VyMSB1c2VyMSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIxIiwiZ2l2ZW5fbmFtZSI6InVzZXIxIiwiZmFtaWx5X25hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIn0.hCIMfH8z-KsCgs6YvnTBwz7mMHknB25cxZhAgFltccmqSCJ7ewnloS0G3h0l2hsWilsAW-jFEP5PrR9S_c_mr2rHRQQNyXbhvYi_7RT3USnJTiFLtFCwogsD57KT3EE-Uel_Z_ZiUO7YFYrXEc-umQKysF2va_icNAAD-sN3aIt_1DwNHVlu_E8iP109ejwQXdMyWPWt-OnUPCi7EUmQD-oJtAAIjI831BFkxKZu-kgyFa7PcYWQ7siz9Me40cFHnU1jqXE7-UjIlPRfcp-SMvkHgB_hE40aEhf1gfxfROX84949d3qMVY1Zx7m8OfkwIZbtwuWgM4YuDCiiqgUT7Q',
                in: 'header',
            },
            'JWT-auth', // Ce nom doit correspondre au décorateur @ApiBearerAuth
        )
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document); // Accès via /docs

    // CORS (pour le frontend)
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
    });

    // Validation automatique des DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(port);

    logger.log(`🚀 Service Biologiste démarré sur le port ${port}`);
    logger.log(`📚 Environnement: ${configService.get('NODE_ENV')}`);
    logger.log(`🗄️  Base de données: PostgreSQL`);
    logger.log(`📖 Swagger UI disponible sur: http://localhost:${port}/docs`);
}

bootstrap();