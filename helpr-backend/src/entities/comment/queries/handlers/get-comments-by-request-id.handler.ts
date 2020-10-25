import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from 'src/database/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetCommentsByRequestIdQuery {
    constructor(
        public readonly requestId: number
    ) {}
}

@QueryHandler(GetCommentsByRequestIdQuery)
export class GetCommentsByRequestIdHandler implements IQueryHandler<GetCommentsByRequestIdQuery> {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>) {}

    public async execute(query: GetCommentsByRequestIdQuery): Promise<Comment[]> {
        let comments = await this.commentRepository.find({requestId: query.requestId});

        if (comments?.length !== 0) {
            return comments;
        }

        throw new HttpException('Could not get Comments by RequestId', HttpStatus.EXPECTATION_FAILED);
    }
}