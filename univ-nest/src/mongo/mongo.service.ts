import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
    private readonly uri: string
    private client: MongoClient

    constructor(uri: string) {
        this.uri = uri
    }

    async connect() {
        this.client = await MongoClient.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as unknown)
    }

    getClient() {
        this.connect()
        return this.client
    }
}
