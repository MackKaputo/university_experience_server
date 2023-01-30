import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { IUser } from "./auth.interfase";
import { v4 as uuidv } from 'uuid'
@Injectable({})
export class AuthService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db
    ){}

    async signup(user) {

        console.log("user: ", user)

        const newUser: IUser = {
            guid: uuidv(),
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isAccountVerified: false
        } 
        const users = this.db.collection('users')
        await users.insertOne(newUser)

        return { msg: "Signed up friend!", users: await users.find({}).toArray() }
    }

    signin() {
        return { masg: "Signed in boss"}
    }
}


// @Injectable({})
// export class AuthService {
//     constructor(private readonly mongoService: MongoService) {}

//     async signup({ user }) {
//         const client = await this.mongoService.getClient().connect(
//             'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
//         )
//         const users = this.db.collection('users')

//         console.log("user: ", user)

//         await users.insertOne(user)

//         return { msg: "Signed up friend!", users: await users.find({}).toArray() }
//     }

//     signin() {
//         return { masg: "Signed in boss"}
//     }
// }
