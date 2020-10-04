import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    tagId: number;

    @Column()
    isDeleted: boolean;
}