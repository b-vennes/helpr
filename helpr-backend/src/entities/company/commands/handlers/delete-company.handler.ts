import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Company } from 'src/database/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class DeleteCompanyCommand {
    constructor(
        public readonly company: Company
    ) {}
}

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler implements ICommandHandler<DeleteCompanyCommand> {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>
      ) { }

    async execute(command: DeleteCompanyCommand) {
        await this.companyRepository.delete(command.company.id);
    }
}