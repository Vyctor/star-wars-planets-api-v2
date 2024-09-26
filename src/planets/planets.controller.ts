import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreatePlanetDto } from './dtos/create-planet.dto';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  private readonly logger = new Logger(PlanetsController.name);

  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  async create(@Body() data: CreatePlanetDto) {
    return this.planetsService.create(data);
  }

  @Get()
  async list() {
    return this.planetsService.list();
  }
}
