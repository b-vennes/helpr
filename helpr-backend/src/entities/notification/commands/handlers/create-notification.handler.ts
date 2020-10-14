import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CreateNotificationCommand {
    constructor(
        public readonly notification: Notification
    ) {}
}

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler implements ICommandHandler<CreateNotificationCommand> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ) {}

    async execute(command: CreateNotificationCommand) {
        return await this.notificationRepository.save(command.notification);
    }
}