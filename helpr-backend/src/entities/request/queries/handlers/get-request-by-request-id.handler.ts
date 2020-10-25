import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Request } from 'src/database/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

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
        let request = await this.requestRepository.findOne(query.requestId);

        if (request) {
            return request;
        }

        throw new HttpException('Could not get the desired Request', HttpStatus.EXPECTATION_FAILED);
    }
}