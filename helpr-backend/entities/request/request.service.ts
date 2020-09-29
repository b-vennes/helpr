import { Request } from 'database/request.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from 'database/comment.entity';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>) {}
    
    async query(): Promise<Request[]> {
        return await this.requestRepository.query("SELECT * FROM request ORDER BY CreatedDate desc LIMIT 3");
    }

    async getAll(): Promise<Request[]> {
        let requests = await this.requestRepository.find();

        for (let request of requests) {
            request.comments = await this.getCommentsOfRequest(request.id);
        }

        return requests;
    }

    async getCommentsOfRequest(requestId: number): Promise<Comment[]> {
        return await (await this.requestRepository.findOne({where: {id: requestId}, relations: ['comments']})).comments;
    }

    async create(request: Request): Promise<Request> {
        return await this.requestRepository.save(request);
    }

    async update(request: Request): Promise<UpdateResult> {
        return await this.requestRepository.update(request.id, request);
    }

    async delete(request: Request): Promise<DeleteResult> {
        return await this.requestRepository.delete(request.id);
    }
}