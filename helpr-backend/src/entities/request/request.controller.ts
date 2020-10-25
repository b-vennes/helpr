import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Request } from 'src/database/request.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetRequestsQuery } from './queries/handlers/get-requests.handler';
import { CreateRequestCommand } from './commands/handlers/create-request.handler';
import { DeleteRequestCommand } from './commands/handlers/delete-request.handler';
import { UpdateRequestCommand } from './commands/handlers/update-request.handler';
import { IncrementLikesRequestCommand } from './commands/handlers/increment-likes-request.handler';
import { GetRequestsByUserIdQuery } from './queries/handlers/get-requests-by-user-id.handler';
import { UpdateResult } from 'typeorm';
import { GetRequestByRequestIdQuery } from './queries/handlers/get-request-by-request-id.handler';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';

@Controller('requests')
@UseFilters(AllExceptionsFilter)
export class RequestController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('get')
    async getAllRequests() {
        return { data: await this.queryBus.execute(new GetRequestsQuery()), status: 200};
    }

    @Get('getByUserId')
    async getRequestsByUserId(@Body() query: GetRequestsByUserIdQuery) {
        return { data: await this.queryBus.execute(new GetRequestsByUserIdQuery(query.userId)), status: 200};
    }

    @Get('getByRequestId/:id')
    async getRequestByRequestId(@Param('id') id: number) {
        return { data: await this.queryBus.execute(new GetRequestByRequestIdQuery(id)), status: 200};
    }

    @Post('create')
    async createRequest(@Body() request: Request) {
        return { data: await this.commandBus.execute(new CreateRequestCommand(request)), status: 200};
    }
    
    @Put('update')
    async updateRequest(@Body() request: Request) {
        return { data: await this.commandBus.execute(new UpdateRequestCommand(request)), status: 200};
    }

    @Put('like')
    async incrementLikes(@Body() request: IncrementLikesRequestCommand) {
        return { data: await this.commandBus.execute(new IncrementLikesRequestCommand(request.requestId)), status: 200};
    }
    
    @Put('close')
    async deleteRequest(@Body() request: Request) {
        return { data: await this.commandBus.execute(new DeleteRequestCommand(request.id)), status: 200};
    }
}