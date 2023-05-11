import { ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Collection, Db } from "mongodb";
import { AuthDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private db;
    private jwt;
    private config;
    usersCollection: Collection;
    constructor(db: Db, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
    signin(dto: AuthDto): Promise<ForbiddenException | NotFoundException | {
        access_token: string;
    } | InternalServerErrorException>;
    signToken(guid: string, email: string): Promise<{
        access_token: string;
    }>;
}
