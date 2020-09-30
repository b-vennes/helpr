import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { Comment } from 'database/comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get('get')
    async getAll(): Promise<Comment[]>  {
        return this.commentService.getAll();
    }

    @Get('query')
    async query(): Promise<Comment[]> {
        return this.commentService.query();
    }

    @Post('create')
    async createComment(@Body() comment: Comment): Promise<Comment> {
        return await this.commentService.create(comment);
    }

    @Put('update')
    async updateComment(@Body() comment: Comment): Promise<any> {
        return await this.commentService.update(comment);
    }

    @Delete('delete')
    async deleteComment(@Body() comment: Comment): Promise<any> {
        return await this.commentService.delete(comment);
    }
}