import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetAllUsersQuery {}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async execute(query: GetAllUsersQuery): Promise<User[]> {
        let users = await this.userRepository.find();

        if (users?.length !== 0) {
            return users;
        }

        throw new HttpException('Could not get Users', HttpStatus.EXPECTATION_FAILED);
    }
}