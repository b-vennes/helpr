import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';
import { CommentController } from './comment.controller';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Comment, Logger])],
    controllers: [CommentController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class CommentModule {}