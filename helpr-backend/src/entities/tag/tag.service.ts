import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/database/tag.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>
    ) {}

    async getAllTags(): Promise<Tag[]> {
        let tags = await this.tagsRepository.find();

        if (tags) {
            return tags;
        }

        throw new HttpException('Could not get Tags', HttpStatus.EXPECTATION_FAILED);
    }
}