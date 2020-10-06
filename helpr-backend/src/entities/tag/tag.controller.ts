import { Controller, Get } from "@nestjs/common";
import { Tag } from 'src/database/tag.entity';
import { TagsService } from "./tag.service";

@Controller('tags')
export class TagController {
    constructor(private tagService: TagsService) {}

    @Get('getAllTags')
    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.getAllTags();
    }
}