import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from 'src/database/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return await this.commentRepository.find({requestId: query.requestId});
    }
}