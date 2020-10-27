import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/database/friend.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';
import { User } from 'src/database/user.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Friend, Logger, User])],
    controllers: [FriendController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class FriendModule {}