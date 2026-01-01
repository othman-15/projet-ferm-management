// src/biologiste/biologiste.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiologisteController } from './biologiste.controller';
import { BiologisteService } from './biologiste.service';
import { Biologiste } from './entities/biologiste.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Biologiste])],
  controllers: [BiologisteController],
  providers: [BiologisteService],
  exports: [BiologisteService], // Pour utilisation dans d'autres modules
})
export class BiologisteModule {}