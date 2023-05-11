import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UniversityDto } from './dto';
import { Collection, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv } from 'uuid'

@Injectable()
export class UniversityService {

    universitiesCollection: Collection
    commentsCollection: Collection

    constructor(
        @Inject("DATABASE_CONNECTION") private db:Db,
        private config: ConfigService
    ) {
        this.universitiesCollection = this.db.collection("universities")
        this.commentsCollection = this.db.collection("comments")
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
        const university = await this.universitiesCollection.findOne({
            guid
        })

        if(!university) {
            return new NotFoundException("University not found")
        }

        return university
    }

    async getUniversityComments(guid: string) {
        try {
            const universityComments = await this.commentsCollection.find({
                university_guid : guid
            }).toArray()

            return {
                success: true,
                data: universityComments
            }

        } catch (error) {
            console.log(error)
            return
        }
    }
}
