import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTag } from 'src/database/usertag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/database/tag.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetTagsByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetTagsByUserIdQuery)
export class GetTagsByUserIdHandler implements IQueryHandler<GetTagsByUserIdQuery> {
    constructor(
        @InjectRepository(UserTag)
        private readonly userTagRepository: Repository<UserTag>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    public async execute(query: GetTagsByUserIdQuery): Promise<UserTag[]> {
        let tempUserTags = await this.userTagRepository.find({userId: query.userId});
        let tags = await this.tagRepository.find();
        let userTags = []

        for (var userTag of tempUserTags) {
            for (var tag of tags) {
                if (userTag.tagId === tag.id) {
                    const tempUserTag = {
                        id: userTag.id,
                        userId: userTag.userId,
                        tagName: tag.name
                    }

                    userTags.push(tempUserTag);
                }
            }
        }

        if (userTags?.length !== 0) {
            return userTags;
        }

        throw new HttpException('Could not get Tags by UserId', HttpStatus.EXPECTATION_FAILED);
    }
}