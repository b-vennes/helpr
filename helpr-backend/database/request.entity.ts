import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    createdDate: Date;

    @Column()
    points: number;

    @Column()
    likes: number;

    @Column()
    isPublicRequest: boolean;

    @ManyToOne(type => User, user => user.request)
    @JoinTable()
    user: User;

    @OneToMany(type => Comment, comment => comment.request)
    comments: Comment[];
}
