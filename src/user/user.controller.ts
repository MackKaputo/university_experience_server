import { Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import * as path from "path"

@Controller()
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: unknown ) {
        console.log("req.user: ", user)
        return user
    }

    @Patch("")
    editUser() {

    }

    @Get('/.well-known/pki-validation/')
    getCertificate(@Res() res: Response) {
        const filePath = "src/A6DE4962C1D690E7EC37ED4918581CF8.txt"
        const absolutePath = path.resolve(filePath);
        res.sendFile(absolutePath)
    }

    @Get('health-ckeck')
    healthCheck(@Res() res: Response){
        res.status(200).json({
            success: true,
            data: {
                message: "Server up and running"
            }
        })
    }

    @Get('test')
    test(@Res() res: Response){
        res.send("Hello there!")
    }
}
