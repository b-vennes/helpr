import { CreateCompanyHandler } from './handlers/create-company.handler';
import { DeleteCompanyHandler } from './handlers/delete-company.handler';
import { UpdateCompanyHandler } from './handlers/update-company.handler';

export const CommandHandlers = [CreateCompanyHandler, UpdateCompanyHandler, DeleteCompanyHandler];