import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Friend } from 'src/database/friend.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateFriendCommand {
    constructor(
        public readonly id: number
    ) {}
}

@CommandHandler(UpdateFriendCommand)
export class UpdateFriendHandler implements ICommandHandler<UpdateFriendCommand> {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>
      ) { }

    async execute(command: UpdateFriendCommand) {
        let friend = await this.friendRepository.findOne(command.id);
        friend.isConfirmed = true;

        return await this.friendRepository.update(friend.id, friend);
    }
}