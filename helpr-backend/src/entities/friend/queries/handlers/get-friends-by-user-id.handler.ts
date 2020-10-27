import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Friend } from 'src/database/friend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetFriendsByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetFriendsByUserIdQuery)
export class GetFriendsByUserIdhandler implements IQueryHandler<GetFriendsByUserIdQuery> {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>
    ) {}

    public async execute(query: GetFriendsByUserIdQuery): Promise<Friend[]> {
        let friends = await this.friendRepository.find({userId: query.userId});
        
        if (friends?.length !== 0) {
            return friends;
        }
        
        throw new HttpException('Could not find any friends by user ID', HttpStatus.EXPECTATION_FAILED);
    }
}