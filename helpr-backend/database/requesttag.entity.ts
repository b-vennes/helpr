import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RequestTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    requestId: number;

    @Column()
    tagId: number;
}