import { Body, Controller, Post } from "@nestjs/common";
import { Logger } from "src/database/logger.entity";
import { LoggerService } from "./logger.service";

@Controller('loggers')
export class LoggerController {
    constructor(
        private readonly loggerService: LoggerService
    ) {}

    @Post('create')
    async create(@Body() logger: Logger) {
        return await this.loggerService.create(logger);
    }
}