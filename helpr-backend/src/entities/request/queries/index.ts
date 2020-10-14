import { GetRequestsHandler } from './handlers/get-requests.handler';
import { GetRequestsByUserIdHandler } from './handlers/get-requests-by-user-id.handler';
import { GetRequestByRequestIdHandler } from './handlers/get-request-by-request-id.handler';

export const QueryHandlers = [GetRequestsHandler, GetRequestsByUserIdHandler, GetRequestByRequestIdHandler];