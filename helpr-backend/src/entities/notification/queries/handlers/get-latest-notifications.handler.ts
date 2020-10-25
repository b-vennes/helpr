import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetLatestNotificationsQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetLatestNotificationsQuery)
export class GetLatestNotificationsHandler implements IQueryHandler<GetLatestNotificationsQuery> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ) {}

    public async execute(query: GetLatestNotificationsQuery): Promise<Notification[]> {
        let notifications = await this.notificationRepository.find({userId: query.userId});
        let latestNotifications = [];
        let count = 0;
        notifications = notifications.sort((a, b) => b.id - a.id);

        for (var notification of notifications) {
            if (count === 5) {
                break;
            }

            latestNotifications.push(notification);
            count += 1;
        }

        if (latestNotifications?.length !== 0) {
            return latestNotifications;
        }

        throw new HttpException('Could not get Notifications by UserId', HttpStatus.EXPECTATION_FAILED);
    }
}