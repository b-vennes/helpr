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
    dateCreated: Date;

    @ManyToOne(type => Request, request => request.comments)
    @JoinTable()
    request: Request;

    @ManyToOne(type => User, user => user.comment)
    user: User;
}