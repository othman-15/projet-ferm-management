import { Model } from 'mongoose';
import { MesureDocument } from './entities/mesure.entity';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { QueryMesureDto } from './dto/query-mesure.dto';
import { EquipmentClient } from "../clients/equipment.client";
import { ProjetClient } from "../clients/projet.client";
export declare class MesureService {
    private mesureModel;
    private readonly equipmentClient;
    private readonly projetClient;
    private readonly logger;
    constructor(mesureModel: Model<MesureDocument>, equipmentClient: EquipmentClient, projetClient: ProjetClient);
    create(createMesureDto: CreateMesureDto, user: any, token: string): Promise<MesureDocument>;
    findAll(query: QueryMesureDto, user: any, token: string): Promise<{
        data: MesureDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByProjet(projetId: string, user: any, token: string): Promise<MesureDocument[]>;
    findOne(id: string, user: any, token: string): Promise<MesureDocument>;
    remove(id: string): Promise<void>;
    getStatistics(projetId?: string): Promise<any>;
}
