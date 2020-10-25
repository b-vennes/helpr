import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/database/history.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([History, Logger])],
    controllers: [HistoryController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class HistoryModule {}