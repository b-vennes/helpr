import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Friend } from 'src/database/friend.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateFriendCommand {
    constructor(
        public readonly friend: Friend
    ) {}
}

@CommandHandler(CreateFriendCommand)
export class CreateFriendHandler implements ICommandHandler<CreateFriendCommand> {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>
      ) { }

    async execute(command: CreateFriendCommand) {
        return await this.friendRepository.save(command.friend);
    }
}