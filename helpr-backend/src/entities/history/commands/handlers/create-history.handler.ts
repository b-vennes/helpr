import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { History } from 'src/database/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CreateHistoryCommand {
    constructor(
        public readonly history: History
    ) {}
}

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler implements ICommandHandler<CreateHistoryCommand> {
    constructor(
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>
    ) {}

    async execute(command: CreateHistoryCommand) {
        return await this.historyRepository.save(command.history);
    }
}