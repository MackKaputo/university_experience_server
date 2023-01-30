import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { Db, MongoClient } from 'mongodb';

@Module({
  providers: [{
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Db> => {
      try {
        const client = await MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      } as unknown )

      console.log("Connecting to database...")

      return client.db('university_experience')

      } catch (error) {
        throw error
      }
}
    }],
  exports: ['DATABASE_CONNECTION']
})
export class MongoModule {}
