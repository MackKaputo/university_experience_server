import { Body, Controller, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
  /**
   * With th code below, nest will handle how to create an instance of the AuthService class,
   * So we don't have to manage where and when it's created. ( const service = new authService())
   * We basically do injection of the AuthService
   */
  constructor(private authService: AuthService) {}
  @Post('signup')
    signup(@Body() dto:AuthDto) {
      console.log("dto @AuthDto", dto)
      return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto:AuthDto) {
    return this.authService.signin(dto)
  }
}
