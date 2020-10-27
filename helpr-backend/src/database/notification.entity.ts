import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    createdDate: Date;

    @Column()
    userId: number;

    @Column()
    requestId: number;

    @Column()
    friendId: number;

    @Column()
    isOpened: boolean;
}