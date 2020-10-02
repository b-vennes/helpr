import { Injectable } from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {}
    
    async query(): Promise<User[]> {
        // we can probably pass in a string from the body later on. This might not even be a 
        // good idea to query this way due to SQL Injection Attacks. 
        let getLatestLimitThree = "SELECT * FROM user ORDER BY id desc LIMIT 3";
        return await this.userRepository.query(getLatestLimitThree);
    }
    
    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async delete(user: User): Promise<DeleteResult> {
        return await this.userRepository.delete(user.id);
    }
}
