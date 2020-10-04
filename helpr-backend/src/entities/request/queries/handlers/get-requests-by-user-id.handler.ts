import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetRequestsByUserIdQuery {
    constructor(
        public readonly userId: number
    ) {}
}

@QueryHandler(GetRequestsByUserIdQuery)
export class GetRequestsByUserIdHandler implements IQueryHandler<GetRequestsByUserIdQuery> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
    ) {}

    public async execute(query: GetRequestsByUserIdQuery): Promise<Request[]> {
        let requests = await this.requestRepository.find();
        let queryRequests = new Array<Request>();

        for (var request of requests) {
            if (request.userId === query.userId) {
                queryRequests.push(request);
            }
        }

        return queryRequests;
        
    }
}