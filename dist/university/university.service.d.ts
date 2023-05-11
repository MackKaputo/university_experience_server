import { NotFoundException } from '@nestjs/common';
import { UniversityDto } from './dto';
import { Collection, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';
export declare class UniversityService {
    private db;
    private config;
    universitiesCollection: Collection;
    commentsCollection: Collection;
    constructor(db: Db, config: ConfigService);
    getUniversities(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    createUniversity(dto: UniversityDto): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
    getUniversityByGuid(guid: string): Promise<import("mongodb").WithId<import("bson").Document> | NotFoundException>;
    getUniversityComments(guid: string): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>[];
    }>;
}
