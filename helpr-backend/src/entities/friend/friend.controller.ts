import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Friend } from 'src/database/friend.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';
import { GetFriendsByUserIdQuery } from './queries/handlers/get-friends-by-user-id.handler';
import { CreateFriendCommand } from './commands/handlers/create-friend.handler';
import { UpdateFriendCommand } from './commands/handlers/update-friend.handler';

@Controller('friends')
@UseFilters(AllExceptionsFilter)
export class FriendController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getFriendsByUserId/:id')
    async getFriendsByUserId(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetFriendsByUserIdQuery(id)),
            status: 200
        };
    }

    @Post('create')
    async sendFriendRequest(@Body() friend: Friend) {
        return { 
            data: await this.commandBus.execute(new CreateFriendCommand(friend)), 
            status: 200
        };
    }

    @Put('update')
    async confirmFriendRequest(@Body() body: any) {
        return { 
            data: await this.commandBus.execute(new UpdateFriendCommand(body.id)), 
            status: 200
        };
    }
}