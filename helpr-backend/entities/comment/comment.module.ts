import { Module } from '@nestjs/common';
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'database/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService]
})

export class CommentModule {}