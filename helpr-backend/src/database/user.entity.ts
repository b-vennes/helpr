import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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