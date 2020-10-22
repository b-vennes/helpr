import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/database/history.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([History])],
    controllers: [HistoryController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class HistoryModule {}