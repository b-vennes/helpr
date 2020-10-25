import { Controller, Get, UseFilters } from "@nestjs/common";
import { AllExceptionsFilter } from "src/requestFilters/all-exceptions.filter";
import { TagsService } from "./tag.service";

@Controller('tags')
@UseFilters(AllExceptionsFilter)
export class TagController {
    constructor(private tagService: TagsService) {}

    @Get('getAllTags')
    async getAllTags() {
        return { 
            data: await this.tagService.getAllTags(), 
            status: 200
        };
    }
}