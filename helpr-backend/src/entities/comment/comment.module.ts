import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';
import { CommentController } from './comment.controller';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class CommentModule {}