// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { AppModule } from './app.module';
//
// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//
//     // CORS (pour Angular)
//     app.enableCors({
//         origin: process.env.FRONTEND_URL || 'http://localhost:4200',
//         credentials: true,
//     });
//
//     // Validation automatique (fonctionne aussi avec GraphQL)
//     app.useGlobalPipes(
//         new ValidationPipe({
//             whitelist: true,
//             forbidNonWhitelisted: true,
//             transform: true,
//         }),
//     );
//
//     const port = process.env.PORT || 8083;
//     await app.listen(port);
//
//     console.log(`🚀 Microservice Mesure démarré sur le port ${port}`);
//     console.log(`🎨 GraphQL Playground : http://localhost:${port}/graphql`);
// }
//
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const port = process.env.PORT || 8083;
    await app.listen(port);

    console.log(`🚀 Microservice Mesure démarré sur le port ${port}`);
}

bootstrap();
