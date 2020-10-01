import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';

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

    @Column()
    userId: number;
}