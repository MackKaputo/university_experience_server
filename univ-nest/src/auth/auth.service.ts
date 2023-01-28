import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signup() {
        return { msg: "Signed up friend!"}
    }

    signin() {
        return { masg: "Signed in boss"}
    }
}
