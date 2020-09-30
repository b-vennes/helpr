import { Comment } from 'database/comment.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>){}

    async query(): Promise<Comment[]> {
        return await this.commentRepository.query("SELECT * FROM comment ORDER BY CreatedDate desc LIMIT 3");
    }

    async getAll(): Promise<Comment[]> {
        return await this.commentRepository.find();
    }
    
    async create(comment: Comment): Promise<Comment> {
        return await this.commentRepository.save(comment);
    }

    async update(comment: Comment): Promise<UpdateResult> {
        return await this.commentRepository.update(comment.id, comment);
    }

    async delete(comment: Comment): Promise<DeleteResult> {
        return await this.commentRepository.delete(comment.id);
    }
}