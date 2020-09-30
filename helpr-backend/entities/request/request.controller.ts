import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Request } from 'database/request.entity';
import { RequestService } from './request.service';

@Controller('requests')
export class RequestController {
    constructor(private requestService: RequestService) {}

    @Get('get')
    async getAll(): Promise<Request[]>  {
        return this.requestService.getAll();
    }

    @Get('query')
    async query(): Promise<Request[]> {
        return this.requestService.query();
    }

    @Post('create')
    async createRequest(@Body() request: Request): Promise<Request> {
        return await this.requestService.create(request);
    }

    @Put('update')
    async updateRequest(@Body() request: Request): Promise<any> {
        return await this.requestService.update(request);
    }

    @Delete('delete')
    async deleteRequest(@Body() request: Request): Promise<any> {
        return await this.requestService.delete(request);
    }
}