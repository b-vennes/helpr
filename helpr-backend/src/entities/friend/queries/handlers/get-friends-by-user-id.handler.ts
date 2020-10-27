import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Friend } from 'src/database/friend.entity';
import { User } from 'src/database/user.entity';
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
        private readonly friendRepository: Repository<Friend>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async execute(query: GetFriendsByUserIdQuery) {
        let friends = await this.friendRepository.find({userId: query.userId});
        let users = await this.userRepository.find();
        let friendsList = [];

        for (var friend of friends) {
            for (var user of users) {
                if ((friend.friendUserId === user.id) && friend.isConfirmed) {
                    friendsList.push(user);
                }
            }
        }
        
        if (friendsList?.length !== 0) {
            return friendsList;
        }
        
        throw new HttpException('Could not find any friends by user ID', HttpStatus.EXPECTATION_FAILED);
    }
}