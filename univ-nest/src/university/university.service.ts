import { Injectable } from '@nestjs/common';

@Injectable()
export class UniversityService {
    async getUniversities() {
        return "list of universities"
    }
}
