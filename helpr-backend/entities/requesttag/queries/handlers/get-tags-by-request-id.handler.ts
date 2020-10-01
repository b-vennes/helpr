import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RequestTag } from 'database/requesttag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetTagsByRequestIdQuery {
    constructor(
        public readonly requestId: number
    ) {}
}

@QueryHandler(GetTagsByRequestIdQuery)
export class GetTagsByRequestIdHandler implements IQueryHandler<GetTagsByRequestIdQuery> {
    constructor(
        @InjectRepository(RequestTag)
        private readonly requestTagRepository: Repository<RequestTag>
    ) {}

    public async execute(query: GetTagsByRequestIdQuery): Promise<RequestTag[]> {
        let requestTags = await this.requestTagRepository.find();
        let queryRequestTags = new Array<RequestTag>();

        for (var requestTag of requestTags) {
            if (requestTag.requestId === query.requestId) {
                queryRequestTags.push(requestTag);
            }
        }

        return queryRequestTags;
    }
}