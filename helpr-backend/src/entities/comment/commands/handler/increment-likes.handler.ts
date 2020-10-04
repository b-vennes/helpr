import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';

export class IncrementLikesCommand {
    constructor(
        public readonly commentId: number 
    ) {}
}

@CommandHandler(IncrementLikesCommand)
export class IncrementLikesHandler implements ICommandHandler<IncrementLikesCommand> {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    async execute(command: IncrementLikesCommand) {
        let comment = await this.commentRepository.findOne(command.commentId);
        comment.like = comment.like + 1;

        return await this.commentRepository.update(comment.id, comment);
    }
}