import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTagsByRequestIdQuery } from "./queries/handlers/get-tags-by-request-id.handler";
import { CreateRequestTagCommand } from "./commands/handlers/create-request-tag.handler";
import { DeleteRequestTagCommand } from "./commands/handlers/delete-request-tag.handler";
import { AllExceptionsFilter } from "src/requestFilters/all-exceptions.filter";

@Controller('requesttags')
@UseFilters(AllExceptionsFilter)
export class RequestTagController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getRequestTagsByRequestId/:id')
    async getByRequestId(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetTagsByRequestIdQuery(id)), 
            status: 200
        };
    }

    @Post('createRequestTag')
    async createRequestTag(@Body() command: CreateRequestTagCommand) {
        return { 
            data: await this.commandBus.execute(new CreateRequestTagCommand(command.requestTag)), 
            status: 200
        };
    }

    @Put('deleteRequestTag')
    async deleteRequestTag(@Body() command: DeleteRequestTagCommand) {
        return { 
            data: await this.commandBus.execute(new DeleteRequestTagCommand(command.requestTag)), 
            status: 200
        };
    }
}