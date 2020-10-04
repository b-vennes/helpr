import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Company } from 'src/database/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UpdateCompanyCommand {
    constructor(
        public readonly company: Company
    ) {}
}

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler implements ICommandHandler<UpdateCompanyCommand> {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
      ) { }

    async execute(command: UpdateCompanyCommand) {
        await this.companyRepository.update(command.company.id, command.company);
    }
}