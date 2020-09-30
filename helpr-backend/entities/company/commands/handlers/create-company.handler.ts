import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Company } from 'database/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateCompanyCommand {
    constructor(
        public readonly company: Company
    ) {}
}

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand> {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
      ) { }

    async execute(command: CreateCompanyCommand) {
        await this.companyRepository.save(command.company)
    }
}