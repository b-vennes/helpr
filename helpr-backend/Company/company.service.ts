import { Injectable } from '@nestjs/common';
import { Company } from 'database/company.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>) {}
        
    async getAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.find();
    }

    async createCompany(company: Company): Promise<Company> {
        return await this.companyRepository.save(company);
    }

    async updateCompany(company: Company): Promise<UpdateResult> {
        return await this.companyRepository.update(company.id, company);
    }

    async deleteCompany(company: Company): Promise<DeleteResult> {
        return await this.companyRepository.delete(company.id);
    } 
}
