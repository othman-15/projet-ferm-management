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
    Headers,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/roles.guard";
import {MesureService} from "./mesure.service";
import {Roles} from "../auth/roles.decorator";
import {CreateMesureDto} from "./dto/create-mesure.dto";
import {QueryMesureDto} from "./dto/query-mesure.dto";


@ApiTags('Mesures')
@ApiBearerAuth('JWT')
@Controller('mesures')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MesureController {
    constructor(private readonly mesureService: MesureService) {}

    // Helper pour extraire le token
    private extractToken(headers: any): string {
        const authHeader = headers.authorization || headers.Authorization;
        return authHeader?.replace('Bearer ', '') || '';
    }

    @Post()
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Créer une nouvelle mesure' })
    @ApiResponse({ status: 201, description: 'Mesure créée avec succès' })
    @ApiResponse({ status: 400, description: 'Données invalides, capteur ou projet inexistant' })
    @ApiResponse({ status: 403, description: 'Accès refusé au projet' })
    async create(
        @Body() createMesureDto: CreateMesureDto,
        @Request() req,
        @Headers() headers,
    ) {
        const token = this.extractToken(headers);
        return this.mesureService.create(createMesureDto, req.user, token);
    }

    @Get()
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Récupérer toutes les mesures' })
    async findAll(
        @Query() query: QueryMesureDto,
        @Request() req,
        @Headers() headers,
    ) {
        const token = this.extractToken(headers);
        return this.mesureService.findAll(query, req.user, token);
    }

    @Get('projet/:projetId')
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: "Récupérer les mesures d'un projet" })
    async findByProjet(
        @Param('projetId') projetId: string,
        @Request() req,
        @Headers() headers,
    ) {
        const token = this.extractToken(headers);
        return this.mesureService.findByProjet(projetId, req.user, token);
    }

    @Get(':id')
    @Roles('ADMIN', 'BIOLOGISTE')
    @ApiOperation({ summary: 'Récupérer une mesure par ID' })
    async findOne(
        @Param('id') id: string,
        @Request() req,
        @Headers() headers,
    ) {
        const token = this.extractToken(headers);
        return this.mesureService.findOne(id, req.user, token);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Supprimer une mesure (ADMIN uniquement)' })
    async remove(@Param('id') id: string) {
        await this.mesureService.remove(id);
        return { message: 'Mesure supprimée avec succès' };
    }
}