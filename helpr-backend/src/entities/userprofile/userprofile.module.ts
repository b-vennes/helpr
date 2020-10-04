import { Module } from '@nestjs/common';
import { UserProfileController } from './userprofile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/database/userprofile.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserProfile])],
    controllers: [UserProfileController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers],
})

export class UserProfileModule {}