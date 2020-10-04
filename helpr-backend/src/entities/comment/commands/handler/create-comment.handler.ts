import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Comment } from 'src/database/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CreateCommentCommand {
    constructor(
        public readonly comment: Comment
    ) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
      ) { }

    async execute(command: CreateCommentCommand) {
        await this.commentRepository.save(command.comment)
    }
}