// src/biologiste/biologiste.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BiologisteService } from './biologiste.service';
import { UpsertBiologisteDto } from './dto/upsert-biologiste.dto';
import { BiologisteResponseDto } from './dto/biologiste-response.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('biologistes')
@ApiBearerAuth('JWT-auth')
@Controller('api/biologistes')
export class BiologisteController {
  private readonly logger = new Logger(BiologisteController.name);

  constructor(private readonly biologisteService: BiologisteService) {}

  // 🌐 Validation inter-services par Keycloak UUID (PUBLIC ou ADMIN selon ton choix)
  @Get('keycloak/:keycloakId/exists')
  @ApiParam({ name: 'keycloakId', type: 'string', format: 'uuid' })
  async existeParKeycloakId(
      @Param('keycloakId') keycloakId: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.biologisteService.existeParKeycloakId(keycloakId);
    return { exists };
  }

  // 🎯 CREATE / UPDATE — ADMIN ONLY
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  async upsertBiologiste(
      @Body(new ValidationPipe({ whitelist: true })) dto: UpsertBiologisteDto,
  ): Promise<BiologisteResponseDto> {
    const biologiste = await this.biologisteService.upsert(dto);
    return BiologisteResponseDto.fromEntity(biologiste);
  }

  // 🔒 Récupérer par ID
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiParam({ name: 'id', type: 'number' })
  async getById(
      @Param('id', ParseIntPipe) id: number,
  ): Promise<BiologisteResponseDto> {
    const biologiste = await this.biologisteService.findById(id);
    return BiologisteResponseDto.fromEntity(biologiste);
  }

  // 🔒 Récupérer par Keycloak UUID
  @Get('keycloak/:keycloakId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiParam({ name: 'keycloakId', type: 'string', format: 'uuid' })
  async getByKeycloakId(
      @Param('keycloakId') keycloakId: string,
  ): Promise<BiologisteResponseDto> {
    const biologiste = await this.biologisteService.findByKeycloakId(keycloakId);
    return BiologisteResponseDto.fromEntity(biologiste);
  }

  // 🔒 Liste des biologistes actifs
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  async getAll(): Promise<BiologisteResponseDto[]> {
    const biologistes = await this.biologisteService.findAllActifs();
    return biologistes.map((b) => BiologisteResponseDto.fromEntity(b));
  }
}
