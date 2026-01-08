import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MesureController } from './mesure.controller';
import { MesureService } from './mesure.service';
import { Mesure, MesureSchema } from './entities/mesure.entity';
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
    controllers: [MesureController],
    providers: [
        MesureService,
        EquipmentClient,
        ProjetClient,
    ],
    exports: [MesureService],
})
export class MesureModule {}