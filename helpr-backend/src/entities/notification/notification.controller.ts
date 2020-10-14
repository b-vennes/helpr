import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Notification } from 'src/database/notification.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetLatestNotificationsQuery } from "./queries/handlers/get-latest-notifications.handler";
import { CreateNotificationCommand } from "./commands/handlers/create-notification.handler";

@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getLatestNotifications/:id')
    async getLatestNotifications(@Param('id') id: number): Promise<Notification[]> {
        return await this.queryBus.execute(new GetLatestNotificationsQuery(id));
    }

    @Post('createNotification')
    async createNotification(@Body() command: CreateNotificationCommand) {
        return await this.commandBus.execute(new CreateNotificationCommand(command.notification));
    }
}