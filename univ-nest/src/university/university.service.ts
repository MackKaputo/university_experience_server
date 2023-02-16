import { Inject, Injectable } from '@nestjs/common';
import { UniversityDto } from './dto';
import { Collection, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv } from 'uuid'

@Injectable()
export class UniversityService {

    universitiesCollection: Collection

    constructor(
        @Inject("DATABASE_CONNECTION") private db:Db,
        private config: ConfigService
    ) {
        this.universitiesCollection = this.db.collection("universities")
    }
    async getUniversities() {
        const universities = this.universitiesCollection.find({}).toArray()
        return universities
    }

    async createUniversity(dto: UniversityDto){
        const guid = uuidv()

        console.log("Received university dto: ", dto)
        const res = await this.universitiesCollection.insertOne({
            guid,
            ...dto,
            created_at: Date.now(),
            updated_at: Date.now(),
        })

        console.log("University created result: ", res)

        return {
            success: true,
            data: await this.universitiesCollection.findOne(
                { guid }
            )
        }
    }

    async getUniversityByGuid(guid: string) {
        const university = this.universitiesCollection.findOne({
            guid
        })

        return university
    }
}
