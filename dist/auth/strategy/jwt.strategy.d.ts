import { ConfigService } from "@nestjs/config";
import { Collection, Db } from "mongodb";
import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private db;
    usersCollection: Collection;
    constructor(config: ConfigService, db: Db);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<import("mongodb").WithId<import("bson").Document>>;
}
export {};
