import { GetUsersByUserIdHandler } from './handlers/get-users-by-id.handler';
import { GetAllUsersHandler } from './handlers/get-users.handler';
import { GetUsersPaginationHandler } from './handlers/get-users-pagination.handler';

export const QueryHandlers = [GetUsersByUserIdHandler, GetAllUsersHandler, GetUsersPaginationHandler];