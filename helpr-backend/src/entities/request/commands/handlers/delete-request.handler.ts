import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class DeleteRequestCommand {
    constructor(
        public readonly id: number
    ) {}
}

@CommandHandler(DeleteRequestCommand)
export class DeleteRequestHandler implements ICommandHandler<DeleteRequestCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    async execute(command: DeleteRequestCommand) {
        let request = await this.requestRepository.findOne(command.id);
        request.isDeleted = true;

        return await this.requestRepository.update(request.id, request);
    }
}