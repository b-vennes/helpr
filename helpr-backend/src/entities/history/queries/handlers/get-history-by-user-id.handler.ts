import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { History } from 'src/database/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return await this.historyRepository.find({userId: query.userId});
    }
}