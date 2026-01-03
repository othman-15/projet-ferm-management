import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MesureModule } from './mesure/mesure.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    // Configuration globale (charge les .env)
    ConfigModule.forRoot({
      isGlobal: true, // Rend ConfigService disponible partout
      load: [databaseConfig],
      envFilePath: '.env',
    }),

    // Connexion MongoDB avec configuration dynamique
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),

    // Modules métier
    AuthModule,
    MesureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
