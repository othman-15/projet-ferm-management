import { MesureService } from "./mesure.service";
import { CreateMesureDto } from "./dto/create-mesure.dto";
import { QueryMesureDto } from "./dto/query-mesure.dto";
export declare class MesureController {
    private readonly mesureService;
    constructor(mesureService: MesureService);
    private extractToken;
    create(createMesureDto: CreateMesureDto, req: any, headers: any): Promise<import("./entities/mesure.entity").MesureDocument>;
    findAll(query: QueryMesureDto, req: any, headers: any): Promise<{
        data: import("./entities/mesure.entity").MesureDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findByProjet(projetId: string, req: any, headers: any): Promise<import("./entities/mesure.entity").MesureDocument[]>;
    findOne(id: string, req: any, headers: any): Promise<import("./entities/mesure.entity").MesureDocument>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
