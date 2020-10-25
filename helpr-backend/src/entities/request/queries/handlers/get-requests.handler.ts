import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetRequestsQuery {}

@QueryHandler(GetRequestsQuery)
export class GetRequestsHandler implements IQueryHandler<GetRequestsQuery> {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>
      ) { }

    public async execute(query: GetRequestsQuery): Promise<Request[]> {
        let requests = await this.requestRepository.find();

        if (requests?.length !== 0) {
            return requests;
        }
        
        throw new HttpException('Could not find any requests', HttpStatus.EXPECTATION_FAILED);
    }
}