import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RequestTag } from 'src/database/requesttag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/database/tag.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetTagsByRequestIdQuery {
    constructor(
        public readonly requestId: number
    ) {}
}

@QueryHandler(GetTagsByRequestIdQuery)
export class GetTagsByRequestIdHandler implements IQueryHandler<GetTagsByRequestIdQuery> {
    constructor(
        @InjectRepository(RequestTag)
        private readonly requestTagRepository: Repository<RequestTag>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    public async execute(query: GetTagsByRequestIdQuery): Promise<any[]> {
        let tempRequestTags = await this.requestTagRepository.find({requestId: query.requestId});
        let tags = await this.tagRepository.find();
        let requestTags = [];
        
        for (var requestTag of tempRequestTags) {
            for (var tag of tags) {
                if (requestTag.tagId === tag.id) {
                    const tempRequestTag = {
                        id: requestTag.id,
                        requestId: requestTag.requestId,
                        tagName: tag.name
                    }

                    requestTags.push(tempRequestTag);
                }
            }
        }
        
        return requestTags;
    }
}