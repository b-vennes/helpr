import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTimeAwarded: Date;

    @Column()
    requestId: number;

    @Column()
    fromUserId: number;

    @Column()
    userId: number;
}