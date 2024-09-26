import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from './entities/planet';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

export type CreatePlanetInput = {
  name: string;
  climate: string;
  terrain: string;
};

@Injectable()
export class PlanetsService {
  constructor(
    private readonly http: HttpService,
    @InjectModel(Planet.name) private planetModel: Model<Planet>,
  ) {}

  async create(input: CreatePlanetInput): Promise<void> {
    const alreadyExists = await this.planetModel.exists({ name: input.name });

    if (alreadyExists) {
      throw new ConflictException(
        `Já existe um planeta com o nome ${input.name}`,
      );
    }

    const formattedName =
      input.name.charAt(0).toUpperCase() + input.name.slice(1);

    const appearences = await firstValueFrom(
      this.http.get<{
        count: number;
        next: number;
        previous: number;
        results: Array<{
          films: Array<string>;
        }>;
      }>('https://swapi.dev/api/planets', {
        params: { search: formattedName },
      }),
    );

    const planet = new this.planetModel({
      ...input,
      name: formattedName,
      appearances: appearences?.data?.results[0]?.films?.length,
    });

    await planet.save();
  }

  async list(): Promise<Planet[]> {
    const planets = await this.planetModel.find().exec();

    return planets.map((planet) => {
      return {
        id: planet._id,
        name: planet.name,
        climate: planet.climate,
        terrain: planet.terrain,
        appearances: planet.appearances ?? 0,
      };
    });
  }
}
