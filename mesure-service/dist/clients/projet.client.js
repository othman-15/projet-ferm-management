"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProjetClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetClient = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let ProjetClient = ProjetClient_1 = class ProjetClient {
    httpService;
    logger = new common_1.Logger(ProjetClient_1.name);
    projetServiceUrl;
    constructor(httpService) {
        this.httpService = httpService;
        this.projetServiceUrl =
            process.env.PROJET_SERVICE_URL || 'http://localhost:8085';
    }
    async verifyProjetExists(projetId, token) {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}`;
            this.logger.debug(`Vérification du projet ${projetId} auprès de ${url}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 5000,
            }));
            this.logger.log(`✅ Projet ${projetId} trouvé`);
            return true;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                if (error.response?.status === 404) {
                    this.logger.warn(`❌ Projet ${projetId} introuvable`);
                    return false;
                }
                if (error.response?.status === 403) {
                    this.logger.error(`🚫 Accès refusé au projet ${projetId}`);
                    throw new common_1.BadRequestException('Accès refusé au projet');
                }
                this.logger.error(`Erreur lors de la vérification du projet ${projetId}: ${error.message}`);
            }
            throw new common_1.BadRequestException(`Impossible de vérifier l'existence du projet: ${error.message}`);
        }
    }
    async verifyBiologisteAccess(userId, projetId, token) {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}/biologistes/${userId}`;
            this.logger.debug(`Vérification de l'accès du biologiste ${userId} au projet ${projetId}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 5000,
            }));
            this.logger.log(`✅ Biologiste ${userId} a accès au projet ${projetId}`);
            return true;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                if (error.response?.status === 404 || error.response?.status === 403) {
                    this.logger.warn(`❌ Biologiste ${userId} n'a pas accès au projet ${projetId}`);
                    return false;
                }
                this.logger.error(`Erreur lors de la vérification de l'accès: ${error.message}`);
            }
            return false;
        }
    }
    async getProjetDetails(projetId, token) {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 5000,
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error(`Impossible de récupérer les détails du projet ${projetId}`);
            throw error;
        }
    }
};
exports.ProjetClient = ProjetClient;
exports.ProjetClient = ProjetClient = ProjetClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ProjetClient);
//# sourceMappingURL=projet.client.js.map