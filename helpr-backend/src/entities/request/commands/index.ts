import { CreateRequestHandler } from './handlers/create-request.handler';
import { DeleteRequestHandler } from './handlers/delete-request.handler';
import { IncrementLikesRequestHandler } from './handlers/increment-likes-request.handler';
import { UpdateRequestHandler } from './handlers/update-request.handler';

export const CommandHandlers = [CreateRequestHandler, UpdateRequestHandler, DeleteRequestHandler, IncrementLikesRequestHandler];