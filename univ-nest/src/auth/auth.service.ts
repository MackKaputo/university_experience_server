import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { MongoService } from "src/mongo/mongo.service";

@Injectable({})
export class AuthService {
    // private client
    // private university_experiencedb
    // private usersCollection

    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db
    ){}

    async signup({ user }) {
    
        const users = this.db.collection('users')

        console.log("user: ", user)

        const res = await users.insertOne(user)

        return { msg: "Signed up friend!", users: res }
    }

    signin() {
        return { masg: "Signed in boss"}
    }
}
