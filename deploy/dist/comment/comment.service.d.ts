import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, Db } from 'mongodb';
import { CommentDto } from './dto';
export declare class CommentService {
    private db;
    private config;
    commentsCollection: Collection;
    constructor(db: Db, config: ConfigService);
    getComments(): Promise<InternalServerErrorException | import("mongodb").WithId<import("bson").Document>[]>;
    createComment(dto: CommentDto): Promise<InternalServerErrorException | {
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
}
