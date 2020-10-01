import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Comment } from 'database/comment.entity';
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
        let comments = await this.commentRepository.find();
        let queryComments = new Array<Comment>();

        for (var comment of comments) {
            if (comment.requestId === query.requestId) {
                queryComments.push(comment);
            }
        }

        return queryComments;
    }
}