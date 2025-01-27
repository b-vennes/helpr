import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

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
        let requests = await this.requestRepository.find({userId: query.userId});
        
        if (requests?.length !== 0) {
            return requests;
        }
        
        throw new HttpException('Could not find any requests by user ID', HttpStatus.EXPECTATION_FAILED);
    }
}