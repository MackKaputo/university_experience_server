import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Collection, Db } from 'mongodb';
import { CommentDto } from './dto';
import { v4 as uuidv } from 'uuid'

@Injectable()
export class CommentService {
    commentsCollection: Collection

    constructor(
        @Inject("DATABASE_CONNECTION") private db:Db,
        private config: ConfigService
    ) {
        this.commentsCollection = this.db.collection("comments")
    }

    async getComments() {
        try {
            const comments = this.commentsCollection.find({}).toArray()
            return comments
        } catch (error) {
            console.log(error)
            return new InternalServerErrorException("Something went wrong, please try again later")

        }
    }

    async createComment(dto: CommentDto) {
        try {
            const guid = uuidv()
            //TODO: validate university ID? Use getUniversityByGuid in University Service?

            const res = await this.commentsCollection.insertOne({
                guid,
                ...dto,
                created_at: Date.now(),
                updated_at: Date.now()
            })
            console.log(res)

            return {
                success: true,
                data: await this.commentsCollection.findOne({
                    guid
                })
            }
        } catch (error) {
            console.log(error)
            return new InternalServerErrorException("Oops! Something went wrong, please try again later")
        }
    }
}
