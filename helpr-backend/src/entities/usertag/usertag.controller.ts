import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserTag } from 'src/database/usertag.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTagsByUserIdQuery } from "./queries/handlers/get-tags-by-user-id.handler";
import { CreateUserTagCommand } from "./commands/handlers/create-user-tag.handler";
import { DeleteUserTagCommand } from "./commands/handlers/delete-user-tag.handler";

@Controller('usertags')
export class UserTagController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getById/:id')
    async getByUserId(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetTagsByUserIdQuery(id)), 
            status: 200
        };
    }

    @Post('createUserTag')
    async createUserTag(@Body() userTag: UserTag) {
        return { 
            data: await this.commandBus.execute(new CreateUserTagCommand(userTag)), 
            status: 200
        };
    }

    @Put('deleteUserTag')
    async deleteUserTag(@Body() command: DeleteUserTagCommand) {
        return { 
            data: await this.commandBus.execute(new DeleteUserTagCommand(command.userTag)), 
            status: 200
        };
    }
}