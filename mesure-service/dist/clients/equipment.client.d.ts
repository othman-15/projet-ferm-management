import { HttpService } from '@nestjs/axios';
export declare class EquipmentClient {
    private readonly httpService;
    private readonly logger;
    private readonly equipmentServiceUrl;
    constructor(httpService: HttpService);
    verifyCapteurExists(capteurId: string, token: string): Promise<boolean>;
    getCapteurDetails(capteurId: string, token: string): Promise<any>;
}
