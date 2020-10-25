import { Module } from '@nestjs/common';
import { RequestTagController } from './requesttag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestTag } from 'src/database/requesttag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { Tag } from 'src/database/tag.entity';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([RequestTag, Tag, Logger])],
    controllers: [RequestTagController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class RequestTagModule {}