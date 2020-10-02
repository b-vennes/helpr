import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Company } from 'src/database/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetCompaniesQuery {}

@QueryHandler(GetCompaniesQuery)
export class GetCompaniesHandler implements IQueryHandler<GetCompaniesQuery> {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
      ) { }

    public async execute(request: GetCompaniesQuery): Promise<Company[]> {
        return await this.companyRepository.find();
    }
}