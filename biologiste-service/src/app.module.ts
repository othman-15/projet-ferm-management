// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiologisteModule } from './biologiste/biologiste.module';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Base de données
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    // Modules métier
    AuthModule,
    BiologisteModule,
  ],
})
export class AppModule {}