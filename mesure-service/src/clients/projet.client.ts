import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

/**
 * Client HTTP pour communiquer avec le microservice Projet
 * Vérifie l'existence des projets et les accès des biologistes
 */
@Injectable()
export class ProjetClient {
    private readonly logger = new Logger(ProjetClient.name);
    private readonly projetServiceUrl: string;

    constructor(private readonly httpService: HttpService) {
        // URL de base du microservice Projet
        this.projetServiceUrl =
            process.env.PROJET_SERVICE_URL || 'http://localhost:8085';
    }

    /**
     * Vérifie si un projet existe
     * Endpoint appelé : GET /projets/{projetId} ou HEAD /projets/{projetId}
     */
    async verifyProjetExists(projetId: string, token: string): Promise<boolean> {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}`;

            this.logger.debug(`Vérification du projet ${projetId} auprès de ${url}`);

            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 5000,
                }),
            );

            this.logger.log(`✅ Projet ${projetId} trouvé`);
            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    this.logger.warn(`❌ Projet ${projetId} introuvable`);
                    return false;
                }
                if (error.response?.status === 403) {
                    this.logger.error(`🚫 Accès refusé au projet ${projetId}`);
                    throw new BadRequestException('Accès refusé au projet');
                }
                this.logger.error(
                    `Erreur lors de la vérification du projet ${projetId}: ${error.message}`,
                );
            }
            throw new BadRequestException(
                `Impossible de vérifier l'existence du projet: ${error.message}`,
            );
        }
    }

    /**
     * Vérifie si un biologiste a accès à un projet spécifique
     * Endpoint appelé : GET /projets/{projetId}/biologistes/{userId}
     * ou GET /projets/{projetId}/access
     */
    async verifyBiologisteAccess(
        userId: string,
        projetId: string,
        token: string,
    ): Promise<boolean> {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}/biologistes/${userId}`;

            this.logger.debug(
                `Vérification de l'accès du biologiste ${userId} au projet ${projetId}`,
            );

            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 5000,
                }),
            );

            this.logger.log(
                `✅ Biologiste ${userId} a accès au projet ${projetId}`,
            );
            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404 || error.response?.status === 403) {
                    this.logger.warn(
                        `❌ Biologiste ${userId} n'a pas accès au projet ${projetId}`,
                    );
                    return false;
                }
                this.logger.error(
                    `Erreur lors de la vérification de l'accès: ${error.message}`,
                );
            }
            // En cas d'erreur réseau, on rejette par sécurité
            return false;
        }
    }

    /**
     * Récupère les détails d'un projet (optionnel)
     */
    async getProjetDetails(projetId: string, token: string): Promise<any> {
        try {
            const url = `${this.projetServiceUrl}/v1/projets/${projetId}`;

            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 5000,
                }),
            );

            return response.data;
        } catch (error) {
            this.logger.error(
                `Impossible de récupérer les détails du projet ${projetId}`,
            );
            throw error;
        }
    }
}