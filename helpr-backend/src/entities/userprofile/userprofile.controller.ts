import { Body, Controller, Get, Put } from "@nestjs/common";
import { UserProfile } from 'src/database/userprofile.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserProfilesQuery } from "./queries/handlers/get-user-profiles.handler";
import { GetUserProfileByIdQuery } from "./queries/handlers/get-user-profile-by-id.handler";
import { AddPointsToUserProfileCommand } from "./commands/handlers/add-points-to-user-profile.handler";
import { UpdateUserProfileCommand } from "./commands/handlers/update-user-profile.handler";

@Controller('userprofiles')
export class UserProfileController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

      @Get('getAll')
      async getAll(): Promise<UserProfile> {
            return await this.queryBus.execute(new GetUserProfilesQuery());
      }

      @Get('getUserProfileById')
      async getUserProfileById(@Body() query: GetUserProfileByIdQuery): Promise<UserProfile[]> {
            return await this.queryBus.execute(new GetUserProfileByIdQuery(query.userProfileId));
      }

      @Put('addPoints')
      async addPointsToUserProfile(@Body() command: AddPointsToUserProfileCommand): Promise<UserProfile> {
            return await this.commandBus.execute(new AddPointsToUserProfileCommand(command.userProfileId, command.points))
      }

      @Put('update')
      async updateUserProfile(@Body() command: UpdateUserProfileCommand): Promise<UserProfile> {
            return await this.commandBus.execute(new UpdateUserProfileCommand(command.userProfile));
      }
}