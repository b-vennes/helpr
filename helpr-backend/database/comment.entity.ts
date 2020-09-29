import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Request } from 'database/request.entity';
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    dateCreated: Date;

    @ManyToOne(type => Request, request => request.id)
    request: Request;
}