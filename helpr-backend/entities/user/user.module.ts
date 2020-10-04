import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/user.entity';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [...QueryHandlers],
})

export class UserModule {}