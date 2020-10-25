import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetUserProfilesQuery {}

@QueryHandler(GetUserProfilesQuery)
export class GetUserProfilesHandler implements IQueryHandler<GetUserProfilesQuery> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
      ) { }

    public async execute(): Promise<UserProfile[]> {
        let userProfile = await this.userProfileRepository.find();

        if (userProfile) {
            return userProfile;
        }

        throw new HttpException('Could not get UserProfile', HttpStatus.EXPECTATION_FAILED);
    }
}