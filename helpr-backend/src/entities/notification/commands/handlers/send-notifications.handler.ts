import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Notification } from 'src/database/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { UserTag } from 'src/database/usertag.entity';
import { RequestTag } from 'src/database/requesttag.entity';
import { Request } from 'src/database/request.entity';

export class SendNotificationCommand {
    constructor(
        public readonly requestId: number
    ) {}
}

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<SendNotificationCommand> {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserTag)
        private readonly userTagRepository: Repository<UserTag>,
        @InjectRepository(RequestTag)
        private readonly requestTagRepository: Repository<RequestTag>,
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
    ) {}

    async execute(command: SendNotificationCommand): Promise<boolean> {
        let users = await this.userRepository.find();
        let request = await this.requestRepository.findOne(command.requestId);
        let userFromCreatedRequest = await this.userRepository.findOne(request.userId);
        let requestTags = await this.requestTagRepository.find({requestId: command.requestId});
        
        for (var user of users) {
            let userTags = await this.userTagRepository.find({userId: user.id});
            
            for (var userTag of userTags) {
                for (var requestTag of requestTags) {
                    if (userTag.tagId === requestTag.tagId) {
                        let notificationDescription = userFromCreatedRequest.firstname 
                        + " " 
                        + userFromCreatedRequest.lastname 
                        + " just posted a Request based on one of your skills.";
                        
                        const notification = {
                            description: notificationDescription,
                            createdDate: new Date(),
                            userId: user.id,
                            requestId: command.requestId,
                            friendId: 0,
                            isOpened: false
                        }

                        await this.notificationRepository.save(notification);
                        break;
                    }
                }
            }
        }

        return true;
    }
}