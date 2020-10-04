import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Message } from 'src/database/message.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMessagesQuery } from './queries/handlers/get-messages.handler';
import { CreateMessageCommand } from './commands/handlers/create-message.handler';

@Controller('messages')
export class MessageController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getMessagesByAssociatedId')
    async getMessagesByAssociatedId(@Body() query: GetMessagesQuery): Promise<Message[]> {
        return await this.queryBus.execute(new GetMessagesQuery(query.associatedMessageId));
    }

    @Post('create')
    async createMessage(@Body() message: Message) {
        return await this.commandBus.execute(new CreateMessageCommand(message));
    }
}