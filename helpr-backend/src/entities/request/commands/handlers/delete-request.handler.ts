import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class DeleteRequestCommand {
    constructor(
        public readonly request: Request
    ) {}
}

@CommandHandler(DeleteRequestCommand)
export class DeleteRequestHandler implements ICommandHandler<DeleteRequestCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    async execute(command: DeleteRequestCommand) {
        await this.requestRepository.update(command.request.id, command.request);
    }
}