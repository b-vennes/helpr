import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return await this.userRepository.findOne(query.userId);
    }
}