import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters} from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/handlers/get-users.handler';
import { GetUsersByUserIdQuery } from './queries/handlers/get-users-by-id.handler';
import { UpdateUserCommand } from './commands/handlers/update-user.handler';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getAllUsers')
    async getAllUsers() {
        return { 
            data: await this.queryBus.execute(new GetAllUsersQuery()), 
            status: 200
        };
    }

    @Get('getById/:id')
    async query(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetUsersByUserIdQuery(id)),
            status: 200
        };
    }

    @Put('updateUser')
    async updateUser(@Body() command: UpdateUserCommand) {
        return { 
            data: await this.commandBus.execute(new UpdateUserCommand(command.userId, command.firstname, command.lastname)),
            status: 200
        };
    }
}