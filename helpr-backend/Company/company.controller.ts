import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Company } from 'database/company.entity';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get('get')
    async getAll(): Promise<Company[]>  {
        return this.companyService.getAllCompanies();
    }

    @Post('create')
    async createCompany(@Body() company: Company): Promise<Company> {
        return await this.companyService.createCompany(company);
    }

    @Put('update')
    async updateCompany(@Body() company: Company): Promise<any> {
        return await this.companyService.updateCompany(company);
    }

    @Delete('delete')
    async deleteCompany(@Body() company: Company): Promise<any> {
        return await this.companyService.deleteCompany(company);
    }
}