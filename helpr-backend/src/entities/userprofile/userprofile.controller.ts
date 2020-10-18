import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UserProfile } from 'src/database/userprofile.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserProfilesQuery } from "./queries/handlers/get-user-profiles.handler";
import { GetUserProfileByIdQuery } from "./queries/handlers/get-user-profile-by-id.handler";
import { AddPointsToUserProfileCommand } from "./commands/handlers/add-points-to-user-profile.handler";
import { UpdateUserProfileCommand } from "./commands/handlers/update-user-profile.handler";
import { DeductPointsToUserProfileCommand } from "./commands/handlers/deduct-points-to-user-profile.handler";

@Controller('userprofiles')
export class UserProfileController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

      @Get('getAll')
      async getAll(): Promise<UserProfile[]> {
            return await this.queryBus.execute(new GetUserProfilesQuery());
      }

      @Get('getUserProfileById/:id')
      async getUserProfileById(@Param('id') id: number): Promise<UserProfile> {
            return await this.queryBus.execute(new GetUserProfileByIdQuery(id));
      }

      @Put('addPoints')
      async addPointsToUserProfile(@Body() command: AddPointsToUserProfileCommand): Promise<UserProfile> {
            return await this.commandBus.execute(new AddPointsToUserProfileCommand(command.id, command.points))
      }

      @Put('deductPoints')
      async deductPointsToUserProfile(@Body() command: DeductPointsToUserProfileCommand): Promise<UserProfile> {
            return await this.commandBus.execute(new DeductPointsToUserProfileCommand(command.id, command.points))
      }

      @Put('update')
      async updateUserProfile(@Body() command: UpdateUserProfileCommand): Promise<UserProfile> {
            return await this.commandBus.execute(new UpdateUserProfileCommand(command.id, command.aboutMe, command.title));
      }
}