import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DeductPointsToUserProfileCommand {
    constructor(
        public readonly id: number,
        public readonly points: number
    ) {}
}

@CommandHandler(DeductPointsToUserProfileCommand)
export class DeductPointsToUserProfileHandler implements ICommandHandler<DeductPointsToUserProfileCommand> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    async execute(command: DeductPointsToUserProfileCommand) {
        let userProfile = await this.userProfileRepository.findOne(command.id);
        userProfile.points = userProfile.points - command.points;

        return await this.userProfileRepository.update(userProfile.id, userProfile);
    }
}