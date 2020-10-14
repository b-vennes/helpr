import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/database/notification.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Notification])],
    controllers: [NotificationController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class NotificationModule {}