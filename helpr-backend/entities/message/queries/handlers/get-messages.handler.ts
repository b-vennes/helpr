import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Message } from 'database/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetMessagesQuery {}

@QueryHandler(GetMessagesQuery)
export class GetMessagesHandler implements IQueryHandler<GetMessagesQuery> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
      ) { }

    public async execute(query: GetMessagesQuery): Promise<Message[]> {
        return await this.messageRepository.find();
    }
}