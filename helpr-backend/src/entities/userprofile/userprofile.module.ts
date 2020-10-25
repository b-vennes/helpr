import { Module } from '@nestjs/common';
import { UserProfileController } from './userprofile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/database/userprofile.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserProfile, Logger])],
    controllers: [UserProfileController],
    providers: [
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers],
})

export class UserProfileModule {}