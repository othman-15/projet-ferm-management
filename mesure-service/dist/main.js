"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
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
    const port = process.env.PORT || 8083;
    await app.listen(port);
    console.log(`🚀 Microservice Mesure démarré sur le port ${port}`);
    console.log(`🎨 GraphQL Playground : http://localhost:${port}/graphql`);
}
bootstrap();
//# sourceMappingURL=main.js.map