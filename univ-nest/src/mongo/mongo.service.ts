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
        try {
            this.client = await MongoClient.connect(this.uri, {
              useNewUrlParser: true,
              useUnifiedTopology: true
          } as unknown )

          console.log("Connecting to database...")
    
          } catch (error) {
            throw error
          }
    }

    getClient() {
        return this.client
    }
}
