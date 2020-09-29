import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Tag } from './tag.entity';

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

    @ManyToOne(type => Company, company => company.id)
    company: Company;

    @OneToMany(type => Tag, tag => tag.id)
    tags: Tag[];
}