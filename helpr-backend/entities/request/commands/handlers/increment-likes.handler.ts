import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'database/request.entity';

export class IncrementLikesCommand {
    constructor(
        public readonly requestId: number 
    ) {}
}

@CommandHandler(IncrementLikesCommand)
export class IncrementLikesHandler implements ICommandHandler<IncrementLikesCommand> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
    ) {}

    async execute(command: IncrementLikesCommand) {
        let request = await this.requestRepository.findOne(command.requestId);
        request.likes = request.likes + 1;

        return await this.requestRepository.update(request.id, request);
    }
}