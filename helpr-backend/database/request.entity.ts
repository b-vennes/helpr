import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    dateCreated: Date;

    @Column()
    points: number;

    @Column()
    likes: number;

    @Column()
    isPublicRequest: boolean;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @OneToMany(type => Tag, tag => tag.id)
    tags: Tag[];
}
