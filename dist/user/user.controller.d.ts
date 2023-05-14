import { Response } from 'express';
export declare class UserController {
    getMe(user: unknown): unknown;
    editUser(): void;
    getCertificate(res: Response): void;
    healthCheck(res: Response): void;
    test(res: Response): void;
    root(res: Response): void;
}
