import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly config: ConfigService) {}

  get MONGO_URI(): string {
    return this.config.get<string>('MONGO_URI');
  }

  get MONGO_USER(): string {
    return this.config.get<string>('MONGO_USER');
  }

  get MONGO_PASSWORD(): string {
    return this.config.get<string>('MONGO_PASSWORD');
  }

  get START_WARS_API_URL(): string {
    return this.config.get<string>('START_WARS_API_URL');
  }
}
