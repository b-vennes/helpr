import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class SetIsOpenedCommand {
    constructor(
        public readonly notification: Notification
    ) {}
}

@CommandHandler(SetIsOpenedCommand)
export class SetIsOpenedHandler implements ICommandHandler<SetIsOpenedCommand> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ) {}

    async execute(command: SetIsOpenedCommand) {
        command.notification.isOpened = true;
        return await this.notificationRepository.update(command.notification.id, command.notification);
    }
}