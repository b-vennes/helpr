import { Module } from '@nestjs/common';
import { UserTagController } from './usertag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTag } from 'src/database/usertag.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { Tag } from 'src/database/tag.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserTag, Tag])],
    controllers: [UserTagController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class UserTagModule {}