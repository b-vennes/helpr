import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { History } from 'src/database/history.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetHistoryByUserIdQuery } from './queries/handlers/get-history-by-user-id.handler';
import { CreateHistoryCommand } from './commands/handlers/create-history.handler';

@Controller('history')
export class HistoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getHistoriesByUserId/:id')
    async getAllUsers(@Param('id') id: number): Promise<History[]>  {
        return this.queryBus.execute(new GetHistoryByUserIdQuery(id));
    }

    @Post('createHistory')
    async updateUser(@Body() command: CreateHistoryCommand) {
        return await this.commandBus.execute(new CreateHistoryCommand(command.history));
    }
}