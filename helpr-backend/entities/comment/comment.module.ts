import { Module } from '@nestjs/common';
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'database/comment.entity';
import { CommentController } from './comment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController]
})

export class CommentModule {}