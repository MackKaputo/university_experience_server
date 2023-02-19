import { Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import * as fs from "fs"
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

    @Get()
    getCertificate(@Res() res: Response) {
        const filePath = "src/CE0644C6D01A217FD099B9CF392C7C87.txt"
        const absolutePath = path.resolve(filePath);
        res.sendFile(absolutePath)
    }
}
