import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    points: number;

    @Column()
    title: string;

    @Column()
    aboutMe: string;

    @Column()
    userId: number;
}