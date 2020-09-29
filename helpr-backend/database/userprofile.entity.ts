import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    points: number;

    @Column()
    aboutMe: string;

    @ManyToOne(type => User, user => user.id)
    user: User;
}