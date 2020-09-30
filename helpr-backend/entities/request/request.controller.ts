import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Request } from 'database/request.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetRequestsQuery } from './queries/handlers/get-requests.handler';
import { CreateRequestCommand } from './commands/handlers/create-request.handler';
import { DeleteRequestCommand } from './commands/handlers/delete-request.handler';
import { UpdateRequestCommand } from './commands/handlers/update-request.handler';
import { IncrementLikesCommand } from './commands/handlers/increment-likes.handler';

@Controller('requests')
export class RequestController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('get')
    async getAllRequests(): Promise<Request[]> {
        return await this.queryBus.execute(new GetRequestsQuery());
    }

    @Post('create')
    async createRequest(@Body() request: Request) {
        return await this.commandBus.execute(new CreateRequestCommand(request));
    }
    
    @Put('update')
    async updateRequest(@Body() request: Request): Promise<any> {
        return await this.commandBus.execute(new UpdateRequestCommand(request));
    }

    @Put('like')
    async incrementLikes(@Body() request: IncrementLikesCommand): Promise<any> {
        return this.commandBus.execute(new IncrementLikesCommand(request.requestId));
    }
    
    @Delete('delete')
    async deleteRequest(@Body() request: Request): Promise<any> {
        return await this.commandBus.execute(new DeleteRequestCommand(request));
    }
}