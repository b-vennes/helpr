import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UpdateUserProfileCommand {
    constructor(
        public readonly userProfile: UserProfile
    ) {}
}

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    async execute(command: UpdateUserProfileCommand) {
        return await this.userProfileRepository.update(command.userProfile.id, command.userProfile);
    }
}