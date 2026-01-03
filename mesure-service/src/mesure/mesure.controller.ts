import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MesureService } from './mesure.service';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { QueryMesureDto } from './dto/query-mesure.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

/**
 * Controller REST pour les mesures
 * Tous les endpoints nécessitent une authentification JWT
 */
@ApiTags('Mesures')
@ApiBearerAuth('JWT')
@Controller('mesures')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MesureController {
    constructor(private readonly mesureService: MesureService) {}

    /**
     * POST /mesures - Créer une nouvelle mesure
     * Accessible par : ADMIN, BIOLOGISTE
     */
    @Post()
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Créer une nouvelle mesure' })
    @ApiResponse({
        status: 201,
        description: 'Mesure créée avec succès',
    })
    @ApiResponse({ status: 400, description: 'Données invalides' })
    @ApiResponse({ status: 401, description: 'Non authentifié' })
    @ApiResponse({ status: 403, description: 'Accès refusé' })
    async create(@Body() createMesureDto: CreateMesureDto, @Request() req) {
        return this.mesureService.create(createMesureDto, req.user);
    }

    /**
     * GET /mesures - Récupérer toutes les mesures avec filtres
     * ADMIN : toutes les mesures
     * BIOLOGISTE : uniquement ses projets
     */
    @Get()
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Récupérer toutes les mesures' })
    @ApiResponse({
        status: 200,
        description: 'Liste des mesures avec pagination',
    })
    @ApiResponse({ status: 401, description: 'Non authentifié' })
    @ApiResponse({ status: 403, description: 'Accès refusé' })
    async findAll(@Query() query: QueryMesureDto, @Request() req) {
        return this.mesureService.findAll(query, req.user);
    }

    /**
     * GET /mesures/projet/:projetId - Récupérer les mesures d'un projet
     * ADMIN : toujours autorisé
     * BIOLOGISTE : seulement si affecté au projet
     */
    @Get('projet/:projetId')
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Récupérer les mesures d\'un projet' })
    @ApiParam({
        name: 'projetId',
        description: 'ID du projet',
        example: '660e8400-e29b-41d4-a716-446655440002',
    })
    @ApiResponse({
        status: 200,
        description: 'Liste des mesures du projet',
    })
    @ApiResponse({ status: 401, description: 'Non authentifié' })
    @ApiResponse({ status: 403, description: 'Accès refusé' })
    async findByProjet(@Param('projetId') projetId: string, @Request() req) {
        return this.mesureService.findByProjet(projetId, req.user);
    }

    /**
     * GET /mesures/:id - Récupérer une mesure par ID
     */
    @Get(':id')
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Récupérer une mesure par ID' })
    @ApiParam({
        name: 'id',
        description: 'ID de la mesure',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiResponse({ status: 200, description: 'Détails de la mesure' })
    @ApiResponse({ status: 404, description: 'Mesure introuvable' })
    @ApiResponse({ status: 401, description: 'Non authentifié' })
    async findOne(@Param('id') id: string, @Request() req) {
        return this.mesureService.findOne(id, req.user);
    }

    /**
     * DELETE /mesures/:id - Supprimer une mesure
     * Accessible uniquement par ADMIN
     */
    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Supprimer une mesure (ADMIN uniquement)' })
    @ApiParam({
        name: 'id',
        description: 'ID de la mesure',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiResponse({ status: 200, description: 'Mesure supprimée' })
    @ApiResponse({ status: 404, description: 'Mesure introuvable' })
    @ApiResponse({ status: 401, description: 'Non authentifié' })
    @ApiResponse({ status: 403, description: 'Accès refusé (rôle ADMIN requis)' })
    async remove(@Param('id') id: string) {
        await this.mesureService.remove(id);
        return { message: 'Mesure supprimée avec succès' };
    }
}