import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Request } from './request.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    passportId: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @ManyToOne(type => Company, company => company.users)
    company: Company;

    @OneToMany(type => Comment, comment => comment.user)
    comment: Comment;
}