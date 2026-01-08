import { HttpService } from '@nestjs/axios';
export declare class ProjetClient {
    private readonly httpService;
    private readonly logger;
    private readonly projetServiceUrl;
    constructor(httpService: HttpService);
    verifyProjetExists(projetId: string, token: string): Promise<boolean>;
    verifyBiologisteAccess(userId: string, projetId: string, token: string): Promise<boolean>;
    getProjetDetails(projetId: string, token: string): Promise<any>;
}
