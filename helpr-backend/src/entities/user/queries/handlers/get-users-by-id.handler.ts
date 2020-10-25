import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetUsersByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetUsersByUserIdQuery)
export class GetUsersByUserIdHandler implements IQueryHandler<GetUsersByUserIdQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async execute(query: GetUsersByUserIdQuery): Promise<User> {
        let user = await this.userRepository.findOne(query.userId);

        if (user) {
            return user;
        }

        throw new HttpException('Could not get User', HttpStatus.EXPECTATION_FAILED);
    }
}