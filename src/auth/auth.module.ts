import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongoModule } from "src/mongo/mongo.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";

@Module({ 
    imports: [JwtModule.register({})], // You can configure here for refresh token if needed. THIS SIGNS the jwt token 
    controllers: [AuthController], 
    providers: [AuthService, JwtStrategy] 
})
export class AuthModule {}
