import { CreateRequestHandler } from './handlers/create-request.handler';
import { DeleteRequestHandler } from './handlers/delete-request.handler';
import { IncrementLikesHandler } from './handlers/increment-likes.handler';
import { UpdateRequestHandler } from './handlers/update-request.handler';

export const CommandHandlers = [CreateRequestHandler, UpdateRequestHandler, DeleteRequestHandler, IncrementLikesHandler];