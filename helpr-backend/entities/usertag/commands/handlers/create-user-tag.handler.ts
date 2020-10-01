import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTag } from 'database/usertag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateUserTagCommand {
    constructor(
        public readonly userTag: UserTag
    ) {}
}

@CommandHandler(CreateUserTagCommand)
export class CreateUserTagHandler implements ICommandHandler<CreateUserTagCommand> {
    constructor(
        @InjectRepository(UserTag)
        private readonly usertagRepository: Repository<UserTag>
      ) { }

    async execute(command: CreateUserTagCommand) {
        await this.usertagRepository.save(command.userTag);
    }
}