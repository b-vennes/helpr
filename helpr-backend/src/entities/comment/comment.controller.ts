import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { Comment } from 'src/database/comment.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCommentsByRequestIdQuery } from './queries/handlers/get-comments-by-request-id.handler';
import { IncrementLikesCommand } from './commands/handler/increment-likes.handler';
import { CreateCommentCommand } from './commands/handler/create-comment.handler';

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('get/:id')
    async getCommentsByRequestId(@Param('id') id: number): Promise<Comment[]>  {
        return await this.queryBus.execute(new GetCommentsByRequestIdQuery(id));
    }

    @Put('like')
    async incrementLikes(@Body() request: IncrementLikesCommand): Promise<any> {
        return await this.commandBus.execute(new IncrementLikesCommand(request.commentId));
    }

    @Post('create')
    async createComment(@Body() comment: Comment): Promise<Comment> {
        return await this.commandBus.execute(new CreateCommentCommand(comment));
    }
}