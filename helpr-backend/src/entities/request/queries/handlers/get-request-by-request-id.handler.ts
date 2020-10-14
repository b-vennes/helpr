import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetRequestByRequestIdQuery {
    constructor(
        public readonly requestId: number
    ) {}
}

@QueryHandler(GetRequestByRequestIdQuery)
export class GetRequestByRequestIdHandler implements IQueryHandler<GetRequestByRequestIdQuery> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
    ) {}

    public async execute(query: GetRequestByRequestIdQuery): Promise<Request> {
        return await this.requestRepository.findOne(query.requestId);
    }
}