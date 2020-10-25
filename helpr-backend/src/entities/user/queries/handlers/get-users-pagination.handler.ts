import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/database/user.entity';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatedUsersResultDto } from '../../dto/paginated-users-result.dto';
import { PaginationDto } from '../../dto/pagination.dto';

export class GetUsersPaginationQuery {
    constructor(
        public readonly paginationDto: PaginationDto
    ) {}
}

@QueryHandler(GetUsersPaginationQuery)
export class GetUsersPaginationHandler implements IQueryHandler<GetUsersPaginationQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    public async execute(query: GetUsersPaginationQuery): Promise<PaginatedUsersResultDto> {
        const skippedItems = (query.paginationDto.page - 1) * query.paginationDto.limit;
        let paginatedUsers = [];
        
        const totalCount = await this.userProfileRepository.count();

        const userProfiles = await this.userProfileRepository.createQueryBuilder()
            .orderBy('points', "DESC")
            .offset(skippedItems)
            .limit(query.paginationDto.limit)
            .getMany();

        if (userProfiles?.length !== 0) {
            for (var userProfile of userProfiles) {
                let user = await this.userRepository.findOne(userProfile.userId);

                const paginatedUser: any = {
                    userProfile: userProfile,
                    user: user
                };

                paginatedUsers.push(paginatedUser);
            }

            return {
                totalCount,
                page: query.paginationDto.page,
                limit: query.paginationDto.limit,
                data: paginatedUsers
            };
        }

        throw new HttpException('No paginated users have been found', HttpStatus.EXPECTATION_FAILED);
    }
}