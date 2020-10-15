import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserProfile } from 'src/database/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UpdateUserProfileCommand {
    constructor(
        public readonly id: number,
        public readonly aboutMe: string,
        public readonly title: string
    ) {}
}

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>
    ) {}

    async execute(command: UpdateUserProfileCommand) {
        let userProfile = await this.userProfileRepository.findOne(command.id);
        userProfile.aboutMe = command.aboutMe;
        userProfile.title = command.title;

        return await this.userProfileRepository.update(userProfile.id, userProfile);
    }
}