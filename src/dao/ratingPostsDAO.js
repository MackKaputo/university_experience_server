import { ObjectId } from "mongodb"

let universities_experience_db
let ratingPostsCollection

export default class ratingPostsDAO {
    
    static async injectDB(conn) {

        if (ratingPostsCollection) { return }

        try {
            universities_experience_db = await conn.db(process.env.DB_UNIVERSITY_EXPERIENCE_NAME)
            ratingPostsCollection = await conn.db(process.env.DB_UNIVERSITY_EXPERIENCE_NAME).collection("rating_posts")
            
            //! For testing purposes only
            this.ratingPostsCollection = ratingPostsCollection
        } catch (error) {
            console.error(`Unable to connect to the ratingPostsDAO: ${error}`)
        }
    }

    static async getRatingPost(){
        //TODO: try catch ad normalize response with { error: Boolean, data: response data}
        const rating_posts = await ratingPostsCollection
            .find({})
            .toArray()
        console.log("Getting rating posts from db...")
        
        return rating_posts
    }

    static async createRatingPost(data) {
        try {

            console.log("Inserting rating post @DAO")
            const insert = await ratingPostsCollection
            .insertOne(data)
            
            if(insert.insertedId) {
                return {
                    success: true,
                    insertedId: insert.insertedId
                }
            }

        } catch (error) {
            console.log(error)
            return null 
        }
    }

  
}