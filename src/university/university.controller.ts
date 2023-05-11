import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityDto } from './dto';

@Controller('api/universities')
export class UniversityController {
    constructor(private universityService: UniversityService){}
    @Get("")
    getUniversities() {
        return this.universityService.getUniversities()
    }

    @Get(":guid")
    getUniversityByGuid(@Param("guid") guid: string ) {
        return this.universityService.getUniversityByGuid(guid)
    }

    @Post("")
    createUniversity(@Body() dto:UniversityDto){
        return this.universityService.createUniversity(dto)
    }

    @Get(":guid/comments")
    getUniversityComments(@Param("guid") guid: string){
        return this.universityService.getUniversityComments(guid)
    }
}
