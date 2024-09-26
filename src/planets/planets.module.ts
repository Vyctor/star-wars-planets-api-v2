import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsController } from './planets.controller';
import { Planet, PlanetSchema } from './entities/planet';
import { PlanetsService } from './planets.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),
  ],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
