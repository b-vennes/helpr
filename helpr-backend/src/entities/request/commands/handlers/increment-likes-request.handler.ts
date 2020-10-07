import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'src/database/request.entity';

export class IncrementLikesRequestCommand {
    constructor(
        public readonly requestId: number 
    ) {}
}

@CommandHandler(IncrementLikesRequestCommand)
export class IncrementLikesRequestHandler implements ICommandHandler<IncrementLikesRequestCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    async execute(command: IncrementLikesRequestCommand) {
        let request = await this.requestRepository.findOne(command.requestId);
        request.likes = request.likes + 1;

        return await this.requestRepository.update(request.id, request);
    }
}