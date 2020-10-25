import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from 'src/database/tag.entity';
import { LoggerService } from '../logger/logger.service';
import { Logger } from 'src/database/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Logger])],
  providers: [TagsService, LoggerService],
  controllers: [TagController],
})
export class TagModule {}