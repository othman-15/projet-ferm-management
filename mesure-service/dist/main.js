"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:4200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Microservice Mesure - API')
        .setDescription('API REST pour la gestion des mesures capteurs dans le système de gestion agricole')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrer le token JWT obtenu depuis Keycloak',
        in: 'header',
    }, 'JWT')
        .addTag('Mesures', 'Gestion des mesures capteurs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3002;
    await app.listen(port);
    console.log(`🚀 Microservice Mesure démarré sur le port ${port}`);
    console.log(`📚 Documentation Swagger : http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map