import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestTag } from 'database/requesttag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateRequestTagCommand {
    constructor(
        public readonly requestTag: RequestTag
    ) {}
}

@CommandHandler(CreateRequestTagCommand)
export class CreateRequestTagHandler implements ICommandHandler<CreateRequestTagCommand> {
    constructor(
        @InjectRepository(RequestTag)
        private readonly requesttagRepository: Repository<RequestTag>
      ) { }

    async execute(command: CreateRequestTagCommand) {
        await this.requesttagRepository.save(command.requestTag);
    }
}