import { Body, Controller, Get, Param, Put, UseFilters } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserProfilesQuery } from "./queries/handlers/get-user-profiles.handler";
import { GetUserProfileByIdQuery } from "./queries/handlers/get-user-profile-by-id.handler";
import { AddPointsToUserProfileCommand } from "./commands/handlers/add-points-to-user-profile.handler";
import { UpdateUserProfileCommand } from "./commands/handlers/update-user-profile.handler";
import { DeductPointsToUserProfileCommand } from "./commands/handlers/deduct-points-to-user-profile.handler";
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';

@Controller('userprofiles')
@UseFilters(AllExceptionsFilter)
export class UserProfileController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getAll')
    async getAll() {
        return { 
            data: await this.queryBus.execute(new GetUserProfilesQuery()),
            status: 200
        };
    }

    @Get('getUserProfileById/:id')
    async getUserProfileById(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetUserProfileByIdQuery(id)),
            status: 200
        };
    }

    @Put('addPoints')
    async addPointsToUserProfile(@Body() command: AddPointsToUserProfileCommand) {
        return { 
            data: await this.commandBus.execute(new AddPointsToUserProfileCommand(command.id, command.points)),
            status: 200
        };
    }

    @Put('deductPoints')
    async deductPointsToUserProfile(@Body() command: DeductPointsToUserProfileCommand) {
        return { 
            data: await this.commandBus.execute(new DeductPointsToUserProfileCommand(command.id, command.points)),
            status: 200
        };
    }

    @Put('update')
    async updateUserProfile(@Body() command: UpdateUserProfileCommand) {
        return { 
            data: await this.commandBus.execute(new UpdateUserProfileCommand(command.id, command.aboutMe, command.title)),
            status: 200
        };
    }
}