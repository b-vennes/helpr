import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Request } from 'database/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateRequestCommand {
    constructor(
        public readonly request: Request
    ) {}
}

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    async execute(command: CreateRequestCommand) {
        await this.requestRepository.save(command.request)
    }
}