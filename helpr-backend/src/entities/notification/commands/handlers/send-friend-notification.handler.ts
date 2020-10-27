import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';

export class SendFriendNotificationCommand {
    constructor(
        public readonly toUserId: number,
        public readonly fromUserId: number
    ) {}
}

@CommandHandler(SendFriendNotificationCommand)
export class SendFriendNotificationHandler implements ICommandHandler<SendFriendNotificationCommand> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async execute(command: SendFriendNotificationCommand) {
        let toUser = await this.userRepository.findOne(command.toUserId);
        let fromUser = await this.userRepository.findOne(command.fromUserId);
        
        let notificationDescription = fromUser.firstname 
        + " " 
        + fromUser.lastname 
        + " sent you a Helpr friend request";
            
        const notification = {
            description: notificationDescription,
            createdDate: new Date(),
            userId: toUser.id,
            requestId: 0,
            isOpened: false
        }

        await this.notificationRepository.save(notification);
        
    }
}