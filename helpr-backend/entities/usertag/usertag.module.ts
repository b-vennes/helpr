import { Module } from '@nestjs/common';
import { UserTagController } from './usertag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTag } from 'database/usertag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserTag])],
    controllers: [UserTagController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class UserTagModule {}