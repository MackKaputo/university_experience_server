import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  /**
   * With th code below, nest will handle how to create an instance of the AuthService class,
   * So we don't have to manage where and when it's created. ( const service = new authService())
   * We basically do injection of the AuthService
   */
  constructor(private authService: AuthService) {}
  @Post('signup')
    signup() {
      const user = { name: "mackp"}
      return this.authService.signup({ user })
  }

  @Post('signin')
  signin() {
    return this.authService.signin()
  }
}
