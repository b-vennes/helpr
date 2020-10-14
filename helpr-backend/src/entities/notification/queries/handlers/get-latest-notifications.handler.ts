import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetLatestNotificationsQuery {
    constructor(
        public readonly notificationId: number
    ) {}
}

@QueryHandler(GetLatestNotificationsQuery)
export class GetLatestNotificationsHandler implements IQueryHandler<GetLatestNotificationsQuery> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ) {}

    public async execute(query: GetLatestNotificationsQuery): Promise<Notification[]> {
        return await this.notificationRepository.find();
    }
}