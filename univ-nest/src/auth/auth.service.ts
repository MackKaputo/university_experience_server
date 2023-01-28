import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signup({ user }) {
        return { msg: "Signed up friend!", user }
    }

    signin() {
        return { masg: "Signed in boss"}
    }
}
