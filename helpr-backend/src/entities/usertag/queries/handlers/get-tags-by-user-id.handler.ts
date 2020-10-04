import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTag } from 'src/database/usertag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetTagsByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetTagsByUserIdQuery)
export class GetTagsByUserIdHandler implements IQueryHandler<GetTagsByUserIdQuery> {
    constructor(
        @InjectRepository(UserTag)
        private readonly userTagRepository: Repository<UserTag>
    ) {}

    public async execute(query: GetTagsByUserIdQuery): Promise<UserTag[]> {
        let userTags = await this.userTagRepository.find();
        let queryUserTags = new Array<UserTag>();

        for (var userTag of userTags) {
            if (userTag.userId === query.userId) {
                queryUserTags.push(userTag);
            }
        }

        return queryUserTags;
    }
}