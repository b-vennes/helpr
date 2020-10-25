import { Module } from '@nestjs/common';
import { UserTagController } from './usertag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTag } from 'src/database/usertag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { Tag } from 'src/database/tag.entity';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserTag, Tag, Logger])],
    controllers: [UserTagController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class UserTagModule {}