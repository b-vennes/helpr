import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserTag } from 'database/usertag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class DeleteUserTagCommand {
    constructor(
        public readonly userTag: UserTag
    ) {}
}

@CommandHandler(DeleteUserTagCommand)
export class DeleteUserTagHandler implements ICommandHandler<DeleteUserTagCommand> {
    constructor(
        @InjectRepository(UserTag)
        private readonly usertagRepository: Repository<UserTag>
      ) { }

    async execute(command: DeleteUserTagCommand) {
        await this.usertagRepository.update(command.userTag.id, command.userTag);
    }
}