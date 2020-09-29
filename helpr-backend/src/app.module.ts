import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './../Company/company.module';
import { Company } from 'database/company.entity';

@Module({
  imports: [CompanyModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'C:/sqlite/helpr2.db',
      synchronize: true,
      logging: false,
      entities: [Company]
    }), 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}