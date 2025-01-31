import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sourceUserId: number;

    @Column()
    destinationUserId: number;

    @Column()
    description: string;

    @Column()
    createdDate: Date;

    @Column()
    associatedMessageId: number;

    @Column()
    isLatestMessage: boolean;
}