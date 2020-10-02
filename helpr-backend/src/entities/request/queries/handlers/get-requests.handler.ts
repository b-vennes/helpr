import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetRequestsQuery {}

@QueryHandler(GetRequestsQuery)
export class GetRequestsHandler implements IQueryHandler<GetRequestsQuery> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    public async execute(query: GetRequestsQuery): Promise<Request[]> {
        return await this.requestRepository.find();
    }
}