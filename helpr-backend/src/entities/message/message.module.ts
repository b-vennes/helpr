import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/database/message.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class MessageModule {}