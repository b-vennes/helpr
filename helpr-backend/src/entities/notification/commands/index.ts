import { CreateNotificationHandler } from './handlers/create-notification.handler';
import { SetIsOpenedHandler } from './handlers/set-is-opened.handler';
import { SendNotificationHandler } from './handlers/send-notifications.handler';
import { SendFriendNotificationHandler } from './handlers/send-friend-notification.handler';

export const CommandHandlers = [CreateNotificationHandler, SetIsOpenedHandler, SendNotificationHandler, SendFriendNotificationHandler];