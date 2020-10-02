import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Company } from 'src/database/company.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCompaniesQuery } from './queries/handlers/get-companies.handler';
import { CreateCompanyCommand } from './commands/handlers/create-company.handler';
import { UpdateCompanyCommand } from './commands/handlers/update-company.handler';
import { DeleteCompanyCommand } from './commands/handlers/delete-company.handler';

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('get')
    async getAllCompanies(): Promise<Company[]>  {
        return await this.queryBus.execute(new GetCompaniesQuery());
    }

    @Post('create')
    async createCompany(@Body() company: Company) {
        return await this.commandBus.execute(new CreateCompanyCommand(company));
    }

    @Put('update')
    async updateCompany(@Body() company: Company): Promise<any> {
        return await this.commandBus.execute(new UpdateCompanyCommand(company));
    }
    
    @Delete('delete')
    async deleteCompany(@Body() company: Company): Promise<any> {
        return await this.commandBus.execute(new DeleteCompanyCommand(company));
    }
    
}