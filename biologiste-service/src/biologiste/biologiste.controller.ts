// src/biologiste/biologiste.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ForbiddenException,
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

  // 🌐 Validation inter-services par Keycloak UUID
  @Get('keycloak/:keycloakId/exists')
  @ApiParam({ name: 'keycloakId', type: 'string', format: 'uuid' })
  async existeParKeycloakId(
      @Param('keycloakId') keycloakId: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.biologisteService.existeParKeycloakId(keycloakId);
    return { exists };
  }

  // 🎯 UPSERT
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'BIOLOGIST')
  @HttpCode(HttpStatus.OK)
  async upsertBiologiste(
      @Body(ValidationPipe) dto: UpsertBiologisteDto,
      @Request() req,
  ): Promise<BiologisteResponseDto> {
    // Protection
    if (req.user.roles.includes('BIOLOGIST') && !req.user.roles.includes('ADMIN')) {
      if (dto.keycloakUserId !== req.user.userId) {
        throw new ForbiddenException('Accès refusé');
      }
    }

    const biologiste = await this.biologisteService.upsert(dto);
    return BiologisteResponseDto.fromEntity(biologiste);
  }

  // 🔒 Récupérer par ID numérique
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'BIOLOGIST')
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
  @Roles('ADMIN', 'BIOLOGIST')
  @ApiParam({ name: 'keycloakId', type: 'string', format: 'uuid' })
  async getByKeycloakId(
      @Param('keycloakId') keycloakId: string,
  ): Promise<BiologisteResponseDto> {
    const biologiste = await this.biologisteService.findByKeycloakId(keycloakId);
    return BiologisteResponseDto.fromEntity(biologiste);
  }

  // 🔒 Liste
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'BIOLOGIST')
  async getAll(): Promise<BiologisteResponseDto[]> {
    const biologistes = await this.biologisteService.findAllActifs();
    return biologistes.map((b) => BiologisteResponseDto.fromEntity(b));
  }
}