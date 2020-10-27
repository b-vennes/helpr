import { Body, Controller, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { Notification } from 'src/database/notification.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetLatestNotificationsQuery } from "./queries/handlers/get-latest-notifications.handler";
import { CreateNotificationCommand } from "./commands/handlers/create-notification.handler";
import { SetIsOpenedCommand } from "./commands/handlers/set-is-opened.handler";
import { SendNotificationCommand } from "./commands/handlers/send-notifications.handler";
import { AllExceptionsFilter } from "src/requestFilters/all-exceptions.filter";
import { SendFriendNotificationCommand } from "./commands/handlers/send-friend-notification.handler";

@Controller('notifications')
@UseFilters(AllExceptionsFilter)
export class NotificationController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getLatestNotificationsByUserId/:id')
    async getLatestNotifications(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetLatestNotificationsQuery(id)), 
            status: 200
        };
    }

    @Post('createNotification')
    async createNotification(@Body() command: CreateNotificationCommand) {
        return { 
            data: await this.commandBus.execute(new CreateNotificationCommand(command.notification)), 
            status: 200
        };
    }

    @Post('sendNotifications')
    async sendNotifications(@Body() command: SendNotificationCommand) {
        return { 
            data: await this.commandBus.execute(new SendNotificationCommand(command.requestId)), 
            status: 200
        };
    }

    @Post('sendFriendNotifications')
    async sendFriendNotifications(@Body() command: SendFriendNotificationCommand) {
        return { 
            data: await this.commandBus.execute(new SendFriendNotificationCommand(command.toUserId, command.fromUserId, command.friendId)), 
            status: 200
        };
    }

    @Put('setIsOpened')
    async setIsOpened(@Body() command: SetIsOpenedCommand) {
        return { 
            data: await this.commandBus.execute(new SetIsOpenedCommand(command.notification)), 
            status: 200
        };
    }
}