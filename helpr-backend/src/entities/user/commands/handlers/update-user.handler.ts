import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { User } from 'src/database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UpdateUserCommand {
    constructor(
        public readonly userId: number,
        public readonly firstname: string,
        public readonly lastname: string
    ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async execute(command: UpdateUserCommand) {
        let user = await this.userRepository.findOne(command.userId)
        user.firstname = command.firstname;
        user.lastname = command.lastname;

        return await this.userRepository.update(user.id, user);
    }
}