import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Request } from './request.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    passportId: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    photo: string;

    @Column()
    companyId: number;
}