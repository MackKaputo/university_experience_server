import { Controller, Get } from '@nestjs/common';
import { UniversityService } from './university.service';

@Controller('universities')
export class UniversityController {
    constructor(private universityService: UniversityService){}
    @Get('')
    getUniversities() {
        return this.universityService.getUniversities()
    }
}
