import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetHistoryByUserIdQuery } from './queries/handlers/get-history-by-user-id.handler';
import { CreateHistoryCommand } from './commands/handlers/create-history.handler';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';

@Controller('history')
@UseFilters(AllExceptionsFilter)
export class HistoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getHistoriesByUserId/:id')
    async getHistoriesByUserId(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetHistoryByUserIdQuery(id)), 
            status: 200
        };
    }

    @Post('createHistory')
    async createHistory(@Body() command: CreateHistoryCommand) {
        return { 
            data: await this.commandBus.execute(new CreateHistoryCommand(command.history)), 
            status: 200
        };
    }
}