import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { History } from 'src/database/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetHistoryByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetHistoryByUserIdQuery)
export class GetHistoryByUserIdHandler implements IQueryHandler<GetHistoryByUserIdQuery> {
    constructor(
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>
    ) {}

    public async execute(query: GetHistoryByUserIdQuery): Promise<History[]> {
        let histories = await this.historyRepository.find({userId: query.userId});

        if (histories?.length !== 0) {
            return histories;
        }

        throw new HttpException('Could not get histories by userId', HttpStatus.EXPECTATION_FAILED);
    }
}