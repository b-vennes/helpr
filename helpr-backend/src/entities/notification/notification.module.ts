import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/database/notification.entity';
import { User } from 'src/database/user.entity';
import { UserTag } from 'src/database/usertag.entity';
import { RequestTag } from 'src/database/requesttag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Notification, User, UserTag, RequestTag])],
    controllers: [NotificationController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class NotificationModule {}