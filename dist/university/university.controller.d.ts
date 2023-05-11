import { UniversityService } from './university.service';
import { UniversityDto } from './dto';
export declare class UniversityController {
    private universityService;
    constructor(universityService: UniversityService);
    getUniversities(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getUniversityByGuid(guid: string): Promise<import("mongodb").WithId<import("bson").Document> | import("@nestjs/common").NotFoundException>;
    createUniversity(dto: UniversityDto): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>;
    }>;
    getUniversityComments(guid: string): Promise<{
        success: boolean;
        data: import("mongodb").WithId<import("bson").Document>[];
    }>;
}
