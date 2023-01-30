import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongoModule } from "src/mongo/mongo.module";

@Module({ 
    // imports: [MongoModule], this was set as a global module, so no need to import here
    controllers: [AuthController], 
    providers: [AuthService] 
})
export class AuthModule {}
