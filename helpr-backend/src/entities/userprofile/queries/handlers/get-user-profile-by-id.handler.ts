import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetUserProfileByIdQuery {
    constructor(
        public readonly userProfileId: number
    ) {}
}

@QueryHandler(GetUserProfileByIdQuery)
export class GetUserProfileByIdHandler implements IQueryHandler<GetUserProfileByIdQuery> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    public async execute(query: GetUserProfileByIdQuery): Promise<UserProfile> {
        return await this.userProfileRepository.findOne(query.userProfileId);
    }
}