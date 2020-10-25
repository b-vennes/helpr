import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from 'src/database/logger.entity';
import { LoggerService } from './logger.service';

@Module({
    imports: [TypeOrmModule.forFeature([Logger])],
    controllers: [LoggerController],
    providers: [LoggerService]
})

export class RequestModule {}