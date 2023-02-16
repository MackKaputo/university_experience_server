import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Collection, Db } from "mongodb";
import { IUser } from "./auth.interfase";
import { v4 as uuidv } from 'uuid'
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
@Injectable({})
export class AuthService {
    //collections needed from db
    usersCollection: Collection

    constructor(
        @Inject('DATABASE_CONNECTION') private db: Db,
        private jwt: JwtService,
        private config: ConfigService
    ){
        // Can't access env vars here
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

        console.log("User Sign Up insert result: ", res)

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
            console.log(this.config.get('JWT_SECRET'))
            const user = await this.usersCollection.findOne(
                {  email: dto.email },
                { projection: { _id: 0 }}
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

            return this.signToken(user.guid, user.email)

        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Sorry, something went wrong. Try again later")
        }
        
    }

    async signToken(guid: string, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: guid,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '45m',   //15 minutes
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token
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
