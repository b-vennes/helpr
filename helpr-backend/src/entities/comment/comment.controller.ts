import { Body, Controller, Get, Param, Post, Put, UseFilters} from '@nestjs/common';
import { Comment } from 'src/database/comment.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCommentsByRequestIdQuery } from './queries/handlers/get-comments-by-request-id.handler';
import { IncrementLikesCommand } from './commands/handler/increment-likes.handler';
import { CreateCommentCommand } from './commands/handler/create-comment.handler';
import { AllExceptionsFilter } from 'src/requestFilters/all-exceptions.filter';

@Controller('comments')
@UseFilters(AllExceptionsFilter)
export class CommentController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('get/:id')
    async getCommentsByRequestId(@Param('id') id: number) {
        return { 
            data: await this.queryBus.execute(new GetCommentsByRequestIdQuery(id)), 
            status: 200
        };
    }

    @Put('like')
    async incrementLikes(@Body() request: IncrementLikesCommand) {
        return { 
            data: await this.commandBus.execute(new IncrementLikesCommand(request.commentId)), 
            status: 200
        };
    }

    @Post('create')
    async createComment(@Body() comment: Comment) {
        return { 
            data: await this.commandBus.execute(new CreateCommentCommand(comment)), 
            status: 200
        };
    }
}