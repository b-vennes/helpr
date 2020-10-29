import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Like, Repository } from 'typeorm';

export class GetRequestsQuery {
    constructor(
        public pageNumber: number,
        public pageSize: number,
        public search: string,
        public includeClosed: boolean) {}
}

@QueryHandler(GetRequestsQuery)
export class GetRequestsHandler implements IQueryHandler<GetRequestsQuery> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    public async execute(query: GetRequestsQuery): Promise<Request[]> {
        const where = {
            description: Like(`%${query.search}%`),
        };

        if (!query.includeClosed) {
            where['isDeleted'] = false;
        }
        
        const result = await this.requestRepository.find({
            skip: query.pageNumber * query.pageSize,
            take: query.pageSize,
            where: where
        });

        return result;
    }
}