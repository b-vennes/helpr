import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../entities/company/company.module';
import { UserModule } from '../entities/user/user.module';
import { RequestModule } from '../entities/request/request.module';
import { CommentModule } from '../entities/comment/comment.module';
import { Company } from 'database/company.entity';
import { User } from 'database/user.entity';
import { UserProfile } from 'database/userprofile.entity';
import { Message } from 'database/message.entity';
import { Tag } from 'database/tag.entity';
import { Request } from 'database/request.entity';
import { Comment } from 'database/comment.entity';
import { UserTag } from 'database/usertag.entity';
import { RequestTag } from 'database/requesttag.entity';

@Module({
  imports: [CompanyModule,
            UserModule,
            RequestModule,
            CommentModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'C:/sqlite/helpr2.db',
      synchronize: true,
      logging: false,
      entities: [
        Company, 
        User, 
        UserProfile, 
        Message, 
        Tag, 
        Request, 
        Comment,
        UserTag,
        RequestTag
      ]
    }), 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}