import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AddPointsToUserProfileCommand {
    constructor(
        public readonly id: number,
        public readonly points: number
    ) {}
}

@CommandHandler(AddPointsToUserProfileCommand)
export class AddPointsToUserProfileHandler implements ICommandHandler<AddPointsToUserProfileCommand> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    async execute(command: AddPointsToUserProfileCommand) {
        let userProfile = await this.userProfileRepository.findOne(command.id);
        userProfile.points = userProfile.points + command.points;
        return await this.userProfileRepository.update(userProfile.id, userProfile);
    }
}