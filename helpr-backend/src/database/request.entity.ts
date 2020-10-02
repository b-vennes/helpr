import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

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

    @Column()
    isDeleted: boolean;

    @Column()
    userId: number;
}
