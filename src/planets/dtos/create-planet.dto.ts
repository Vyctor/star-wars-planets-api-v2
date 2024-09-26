import { IsString, Length } from 'class-validator';

export class CreatePlanetDto {
  @IsString({
    message: 'Name precisa ser uma string',
  })
  @Length(1, 50, {
    message: 'Name precisa ter entre 1 e 50 caracteres',
  })
  name: string;

  @IsString({
    message: 'Climate precisa ser uma string',
  })
  @Length(1, 50, {
    message: 'Climate precisa ter entre 1 e 50 caracteres',
  })
  climate: string;

  @IsString({
    message: 'Climate precisa ser uma string',
  })
  @Length(1, 50, {
    message: 'Climate precisa ter entre 1 e 50 caracteres',
  })
  terrain: string;
}
