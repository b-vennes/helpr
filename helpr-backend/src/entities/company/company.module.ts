import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/database/company.entity';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Company])],
    controllers: [CompanyController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class CompanyModule {}