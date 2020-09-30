import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserProfile } from 'database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetUserProfilesQuery {}

@QueryHandler(GetUserProfilesQuery)
export class GetUserProfilesHandler implements IQueryHandler<GetUserProfilesQuery> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
      ) { }

    public async execute(): Promise<UserProfile[]> {
        return await this.userProfileRepository.find();
    }
}