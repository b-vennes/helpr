import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RequestTag } from 'src/database/requesttag.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTagsByRequestIdQuery } from "./queries/handlers/get-tags-by-request-id.handler";
import { CreateRequestTagCommand } from "./commands/handlers/create-request-tag.handler";
import { DeleteRequestTagCommand } from "./commands/handlers/delete-request-tag.handler";

@Controller('requesttags')
export class RequestTagController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getRequestTagsByRequestId/:id')
    async getByRequestId(@Param('id') id: number): Promise<any[]> {
        return await this.queryBus.execute(new GetTagsByRequestIdQuery(id));
    }

    @Post('createRequestTag')
    async createRequestTag(@Body() command: CreateRequestTagCommand): Promise<RequestTag> {
        return await this.commandBus.execute(new CreateRequestTagCommand(command.requestTag));
    }

    @Put('deleteRequestTag')
    async deleteRequestTag(@Body() command: DeleteRequestTagCommand): Promise<boolean> {
        return await this.commandBus.execute(new DeleteRequestTagCommand(command.requestTag));
    }
}