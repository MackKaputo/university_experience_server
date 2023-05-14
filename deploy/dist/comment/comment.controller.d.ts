import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getComments(): Promise<import("@nestjs/common").InternalServerErrorException | import("mongodb").WithId<import("bson").Document>[]>;
    createComment(dto: CommentDto): Promise<import("@nestjs/common").InternalServerErrorException | {
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
}
