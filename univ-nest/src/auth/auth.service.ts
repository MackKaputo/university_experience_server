import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Db } from "mongodb";
import { IUser } from "./auth.interfase";
import { v4 as uuidv } from 'uuid'
import { AuthDto } from "./dto";
import * as argon from "argon2"
@Injectable({})
export class AuthService {
    usersCollection
    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db
    ){
        this.usersCollection = this.db.collection('users')
    }

    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password)
        
        const isUserExist = await this.usersCollection.findOne({ email: dto.email })
        if(isUserExist) {
            throw new ForbiddenException("Email already exists")
        }

        const guid = uuidv()
        const res = await this.usersCollection.insertOne({
            guid,
            email: dto.email,
            password: hash,
            created_at: Date.now(),
            updated_at: Date.now(),
            username: "",
            first_name: "",
            last_name: ""
        })

        return { 
            success: true, 
            data: await this.usersCollection.findOne(
                { guid }, 
                { projection: { password: 0 , _id: 0}}
            )
        }
    }

    async signin(dto: AuthDto) {
        try {
            const user = await this.usersCollection.findOne(
                {  email: dto.email },
            )
    
            if(!user) {
                return new NotFoundException("User not found")
            }
    
            const passwordMatch = await argon.verify(
                user.password,
                dto.password
            )
    
            if(!passwordMatch) {
                throw new ForbiddenException("Incorrect password")
            }

            delete user.password
            delete user._id

            return {
                success: true,
                data: user
            }

        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Sorry, something went wrong. Try again later")
        }
        
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
