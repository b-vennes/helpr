import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Logger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    success: boolean;

    @Column()
    message: string;

    @Column()
    httpStatusCode: number;

    @Column()
    isBackEnd: boolean;

    @Column()
    isFrontEnd: boolean;

    @Column()
    timestamp: Date;
}