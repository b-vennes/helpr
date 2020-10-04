import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Message } from 'src/database/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateMessageCommand {
    constructor(
        public readonly message: Message
    ) {}
}

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
      ) { }

    async execute(command: CreateMessageCommand) {
        await this.messageRepository.save(command.message)
    }
}