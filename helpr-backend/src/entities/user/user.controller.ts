import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/handlers/get-users.handler';
import { GetUsersByUserIdQuery } from './queries/handlers/get-users-by-id.handler';
import { UpdateUserCommand } from './commands/handlers/update-user.handler';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';
import { PaginationDto } from './dto/pagination.dto';
import { GetUsersPaginationQuery } from './queries/handlers/get-users-pagination.handler';

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

    @Get('getUsersByPagination')
    async getUsersByPagination(@Query() paginationDto: PaginationDto) {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit)
        paginationDto.limit > 5 ? 5 : paginationDto.limit;

        return {
            data: await this.queryBus.execute(new GetUsersPaginationQuery(paginationDto)),
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