import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    friendUserId: number;

    @Column()
    isConfirmed: boolean;
}