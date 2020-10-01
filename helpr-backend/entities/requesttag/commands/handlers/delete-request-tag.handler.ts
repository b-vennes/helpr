import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestTag } from 'database/requesttag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class DeleteRequestTagCommand {
    constructor(
        public readonly requestTag: RequestTag
    ) {}
}

@CommandHandler(DeleteRequestTagCommand)
export class DeleteRequestTagHandler implements ICommandHandler<DeleteRequestTagCommand> {
    constructor(
        @InjectRepository(RequestTag)
        private readonly requesttagRepository: Repository<RequestTag>
      ) { }

    async execute(command: DeleteRequestTagCommand) {
        await this.requesttagRepository.update(command.requestTag.id, command.requestTag);
    }
}