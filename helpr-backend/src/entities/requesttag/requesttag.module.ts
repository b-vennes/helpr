import { Module } from '@nestjs/common';
import { RequestTagController } from './requesttag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestTag } from 'src/database/requesttag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([RequestTag])],
    controllers: [RequestTagController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class RequestTagModule {}