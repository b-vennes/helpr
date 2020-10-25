import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '../../database/logger.entity';

@Injectable()
export class LoggerService {
    constructor(
        @InjectRepository(Logger)
        private loggerRepository: Repository<Logger>,
    ) {}

    async create(logger) {
        return await this.loggerRepository.save(logger);
    }
}