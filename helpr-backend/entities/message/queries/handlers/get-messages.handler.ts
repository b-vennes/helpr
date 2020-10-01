import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Message } from 'database/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetMessagesQuery {
    constructor(
        public readonly associatedMessageId: number
    ) {}
}

@QueryHandler(GetMessagesQuery)
export class GetMessagesHandler implements IQueryHandler<GetMessagesQuery> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
      ) { }

    public async execute(query: GetMessagesQuery): Promise<Message[]> {
        let messages = await this.messageRepository.find();
        let queryMessages = new Array<Message>();

        for (var message of messages) {
            if (message.associatedMessageId === query.associatedMessageId) {
                queryMessages.push(message);
            }
        }

        return queryMessages;
    }
}