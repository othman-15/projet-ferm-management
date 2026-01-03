import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MesureController } from './mesure.controller';
import { MesureService } from './mesure.service';
import { Mesure, MesureSchema } from './entities/mesure.entity';

/**
 * Module Mesure
 * Encapsule toute la logique métier des mesures
 */
@Module({
    imports: [
        // Enregistrement du schéma Mongoose
        MongooseModule.forFeature([
            { name: Mesure.name, schema: MesureSchema },
        ]),
    ],
    controllers: [MesureController],
    providers: [MesureService],
    exports: [MesureService], // Exporter si d'autres modules en ont besoin
})
export class MesureModule {}