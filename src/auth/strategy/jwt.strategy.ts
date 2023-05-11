import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Collection, Db } from "mongodb";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    // 'jwt',  This would be the identifier you use in the Guard.
    ) {

    usersCollection: Collection
    constructor(
        config: ConfigService,
        @Inject("DATABASE_CONNECTION") private db: Db,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
            // ignoreExpiration: false   default  value, no need to be set
        })
        this.usersCollection = this.db.collection('users')
    }

    validate(payload: { sub: string, email: string }) {
        // The return value in here is set on req.user
        const user = this.usersCollection.findOne(
            { guid: payload?.sub },
            { projection: { password: 0 }}
        )
        // if user is null, then an unauthorized response is returned 
        return user
    }
}