import { ObjectId } from "mongodb"

let universities_experience_db
let universitiesCollection

export default class ratingPostsDAO {
    
    static async injectDB(conn) {

        if (universitiesCollection) { return }

        try {
            universities_experience_db = await conn.db(process.env.DB_UNIVERSITY_EXPERIENCE_NAME)
            universitiesCollection = await conn.db(process.env.DB_UNIVERSITY_EXPERIENCE_NAME).collection("universities")
            
            //! For testing purposes only
            this.universitiesCollection = universitiesCollection
        } catch (error) {
            console.error(`Unable to connect to the UniversitiesDAO: ${error}`)
        }
    }

    static async getUniversities(){
        //TODO: try catch ad normalize response with { error: Boolean, data: response data}
        const universities = await universitiesCollection
            .find({})
            .toArray()
        console.log("Getting universities from db...")
        
        return universities
    }

  
}