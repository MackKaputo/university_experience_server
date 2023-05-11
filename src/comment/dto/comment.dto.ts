import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

interface User {
    guid: string;
    name: string;
}

interface Reply {
    user: User;
    comment: string;
}

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    university_guid: string;

    @IsObject()
    user: User;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsArray()
    replies: Reply[];
}