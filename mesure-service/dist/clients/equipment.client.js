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
var EquipmentClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentClient = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let EquipmentClient = EquipmentClient_1 = class EquipmentClient {
    httpService;
    logger = new common_1.Logger(EquipmentClient_1.name);
    equipmentServiceUrl;
    constructor(httpService) {
        this.httpService = httpService;
        this.equipmentServiceUrl =
            process.env.EQUIPMENT_SERVICE_URL || 'http://localhost:8080/v1';
    }
    async verifyCapteurExists(capteurId, token) {
        try {
            const url = `${this.equipmentServiceUrl}/v1/equipments/capteurs/${capteurId}`;
            this.logger.debug(`Vérification du capteur ${capteurId} auprès de ${url}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));
            this.logger.debug(`Capteur ${capteurId} trouvé : ${response.data}`);
            return true;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                if (error.response?.status === 404) {
                    this.logger.warn(`Capteur ${capteurId} introuvable`);
                    return false;
                }
                this.logger.error(`Erreur lors de la vérification du capteur ${capteurId}: ${error.message}`);
            }
            throw error;
        }
    }
    async getCapteurDetails(capteurId, token) {
        try {
            const url = `${this.equipmentServiceUrl}/v1/equipments/capteurs/${capteurId}`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            this.logger.error(`Impossible de récupérer les détails du capteur ${capteurId}`);
            throw error;
        }
    }
};
exports.EquipmentClient = EquipmentClient;
exports.EquipmentClient = EquipmentClient = EquipmentClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], EquipmentClient);
//# sourceMappingURL=equipment.client.js.map