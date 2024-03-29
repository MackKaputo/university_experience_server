import { Global, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { MongoService } from './mongo.service';



@Global()
@Module({
  providers: [{
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Db> => {
      try {
        const client = await MongoClient.connect(process.env.DATABASE_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      } as unknown )

      console.log("Connecting to database...")

      return client.db(process.env.DB_NAME)

      } catch (error) {
        throw error
      }
    }
    }],
  exports: ['DATABASE_CONNECTION']
})
export class MongoModule {}

// @Global()
// @Module({
//   providers: [{
//     provide: MongoService,
//     useFactory: () => {
//       return new MongoService('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
//     }
//   }],
//   exports: [MongoService]
// })
// export class MongoModule {}