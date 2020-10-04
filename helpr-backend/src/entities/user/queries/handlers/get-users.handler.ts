import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetAllUsersQuery {}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async execute(query: GetAllUsersQuery): Promise<User[]> {
        return await this.userRepository.find();
    }
}