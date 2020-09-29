import { Injectable } from '@nestjs/common';
import { Message } from 'database/message.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>){}

    async query(): Promise<Message[]> {
        let getLatestLimitThree = "SELECT * FROM message ORDER BY id desc LIMIT 3";
        return await this.messageRepository.query(getLatestLimitThree);
    }

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }
    
    async create(message: Message): Promise<Message> {
        return await this.messageRepository.save(message);
    }

    async update(message: Message): Promise<UpdateResult> {
        return await this.messageRepository.update(message.id, message);
    }

    async delete(message: Message): Promise<DeleteResult> {
        return await this.messageRepository.delete(message.id);
    }
}