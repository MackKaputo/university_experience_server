import { Module } from "@nestjs/common";
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MongoModule } from './mongo/mongo.module';
import { ConfigModule } from "@nestjs/config";
import { UniversityModule } from './university/university.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    // Add the config module for env vars
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    MongoModule, 
    UniversityModule, CommentModule
  ],
  providers: [CommentService]
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
