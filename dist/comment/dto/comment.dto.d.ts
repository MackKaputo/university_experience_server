interface User {
    guid: string;
    name: string;
}
interface Reply {
    user: User;
    comment: string;
}
export declare class CommentDto {
    university_guid: string;
    user: User;
    comment: string;
    replies: Reply[];
}
export {};
