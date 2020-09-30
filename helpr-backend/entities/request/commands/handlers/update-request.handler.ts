import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Request } from 'database/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateRequestCommand {
    constructor(
        public readonly request: Request
    ) {}
}

@CommandHandler(UpdateRequestCommand)
export class UpdateRequestHandler implements ICommandHandler<UpdateRequestCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    async execute(command: UpdateRequestCommand) {
        await this.requestRepository.update(command.request.id, command.request);
    }
}