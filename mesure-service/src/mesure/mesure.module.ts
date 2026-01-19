import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MesureService } from './mesure.service';
import { Mesure, MesureSchema } from './entities/mesure.entity';

import { MesureResolver } from './graphql/mesure.resolver';
import {EquipmentClient} from "../clients/equipment.client";
import {ProjetClient} from "../clients/projet.client";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Mesure.name, schema: MesureSchema },
        ]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    // ❌ SUPPRIMÉ : controllers: [MesureController],
    providers: [
        MesureService,
        EquipmentClient,
        ProjetClient,
        MesureResolver, // ✅ Uniquement GraphQL
    ],
    exports: [MesureService],
})
export class MesureModule {}