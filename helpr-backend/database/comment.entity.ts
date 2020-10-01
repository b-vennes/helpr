import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { Request } from 'database/request.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    createdDate: Date;

    @Column()
    like: number;

    @Column()
    requestId: number;

    @Column()
    isDeleted: boolean;

    @ManyToOne(type => User, user => user.comment)
    user: User;
}