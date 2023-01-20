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
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null 
        }
    }

    static async addComment(postUuid, newComment) {
        try {
            console.log("Addint a comment for received data as: ", data)
            const update = await ratingPostsCollection.updateOne(
                { uuid: postUuid},
                { $push: {
                    comments: {
                        ...newComment
                    }
                }}
                // {comments:{commenter:{username:"Mack Kaputo",uuid:'4500984d-4eaa-4017-a3da-27b80eb93120'}, text:"Univ is not that bad! learnt something here"}}
            ) //! To be completed

            // check successful response of update here before returning the data
            if(update) {
                //Code here

                return {
                    success: true,

                }
            }
                                
        } catch (error) {
            
        }
    }

    //TODO: make a comment as an individual object when reponding on successful repsonse

    //TODO: Track Sharing of a comment or Post?? --> Via DB or GA?

  
}