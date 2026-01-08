import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

/**
 * Client HTTP pour communiquer avec le microservice Equipment
 * Vérifie l'existence des capteurs avant de créer une mesure
 */
@Injectable()
export class EquipmentClient {
    private readonly logger = new Logger(EquipmentClient.name);
    private readonly equipmentServiceUrl: string;

    constructor(private readonly httpService: HttpService) {
        // URL du microservice Equipment (à configurer dans .env)
        this.equipmentServiceUrl =
            process.env.EQUIPMENT_SERVICE_URL || 'http://localhost:8080/v1';
    }

    /**
     * Vérifie si un capteur existe dans le microservice Equipment
     * @param capteurId - ID du capteur à vérifier
     * @param token - JWT token pour authentification
     * @returns true si le capteur existe, sinon lance une exception
     */
    async verifyCapteurExists(capteurId: string, token: string): Promise<boolean> {
        try {
            const url = `${this.equipmentServiceUrl}/v1/equipments/capteurs/${capteurId}`;

            this.logger.debug(`Vérification du capteur ${capteurId} auprès de ${url}`);

            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            );

            this.logger.debug(`Capteur ${capteurId} trouvé : ${response.data}`);
            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    this.logger.warn(`Capteur ${capteurId} introuvable`);
                    return false;
                }
                this.logger.error(
                    `Erreur lors de la vérification du capteur ${capteurId}: ${error.message}`,
                );
            }
            throw error;
        }
    }

    /**
     * Récupère les détails d'un capteur (optionnel)
     * @param capteurId - ID du capteur
     * @param token - JWT token
     */
    async getCapteurDetails(capteurId: string, token: string): Promise<any> {
        try {
            const url = `${this.equipmentServiceUrl}/v1/equipments/capteurs/${capteurId}`;

            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            );

            return response.data;
        } catch (error) {
            this.logger.error(`Impossible de récupérer les détails du capteur ${capteurId}`);
            throw error;
        }
    }
}