import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsModule } from './planets/planets.module';
import { ConfigModule } from './config/config.module';
import { EnvironmentService } from './config/environment.service';

@Module({
  imports: [
    PlanetsModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [EnvironmentService],
      useFactory: (configService: EnvironmentService) => ({
        uri: configService.MONGO_URI,
        dbName: 'planets',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
