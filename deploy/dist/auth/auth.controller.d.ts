import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
    signin(dto: AuthDto): Promise<import("@nestjs/common").ForbiddenException | import("@nestjs/common").NotFoundException | {
        access_token: string;
    } | import("@nestjs/common").InternalServerErrorException>;
}
