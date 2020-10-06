import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/entities/company/company.module';
import { UserModule } from 'src/entities/user/user.module';
import { RequestModule } from 'src/entities/request/request.module';
import { CommentModule } from 'src/entities/comment/comment.module';
import { RequestTagModule } from 'src/entities/requesttag/requesttag.module';
import { UserProfileModule } from 'src/entities/userprofile/userprofile.module';
import { UserTagModule } from 'src/entities/usertag/usertag.module';
import { TagModule } from 'src/entities/tag/tag.module';
import { Company } from 'src/database/company.entity';
import { User } from 'src/database/user.entity';
import { UserProfile } from 'src/database/userprofile.entity';
import { Message } from 'src/database/message.entity';
import { Tag } from 'src/database/tag.entity';
import { Request } from 'src/database/request.entity';
import { Comment } from 'src/database/comment.entity';
import { UserTag } from 'src/database/usertag.entity';
import { RequestTag } from 'src/database/requesttag.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    RequestModule,
    CommentModule,
    AuthModule,
    RequestTagModule,
    UserProfileModule,
    UserTagModule,
    TagModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'helpr.db',
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
    providers: [],
})
export class AppModule {}