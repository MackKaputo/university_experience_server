import { ObjectId } from "mongodb"

let universities_experience_db
let universitiesCollection

export default class UniversitiesDAO {
    
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
        try {
            const universities = await universitiesCollection
            .find({})
            .toArray()
            console.log("Getting universities from db...")
            
            return {
                success: true,
                data: universities
            }
        } catch (error) {
            console.log(error)
            return null 
        }
    }

    static async getUniversityById(id) {

        try {
            const university = await universitiesCollection.findOne({ _id: ObjectId(id)})
            console.log("Found university :", university)
            
            if(!university) {
                return {
                    success: false,
                    message: "Could not retrieve university"
                }
            }

            return {
                success: true,
                data: university
            }
            
            
        } catch (error) {
            if (error.toString().startsWith( "BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters",)) {
                return {
                    success: false,
                    message: "University not found"
                }
            }
          // Catch the InvalidId error by string matching, and then handle it.
          console.error(`Something went wrong in getMovieByID: ${error}`)
          throw error
        }
    }

    static async createUniversity(data) {
        
        try {
            const insert = await universitiesCollection
            .insertOne(data)
        
            if(insert.acknowledged) {
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

    static async deleteUniversity(id) {

        try {

            const deleteObject = { _id: ObjectId(id) }
        
            const deleteResponse = await universitiesCollection.deleteOne(deleteObject)

            console.log("DB deletion response of university: ", deleteResponse)

            if(deleteResponse.deletedCount === 1) {
                return {
                    success: true,
                    message: "University deleted"
                }

            } else {
                console.log("Delete response: ", deleteResponse)
                return {
                    success: false,
                    message: "University could not be deleted deleted"
                }
            }

        } catch (error) {

            console.log("Failed to delete university with id: ", id)
            console.log(error)
            
            return {
                success: false,
                message: "COuld not delete this university"
            }
        }
    }

    static async createUniversityReview(){
        //* Will have categories, object to contain: faculty/department, university, reviewer 
    }

    static async getReviewsByUniversity(){
        //TODO: create a review colllection
    }


    static async createVoice(){
        //* a voice is a type of post students would make to be heard by the university stuff or other students
        // * A voice's state will be {"heard/acknowledged": true, "number_of_people_supporting": 34, "number_of_people_against": 456 } 
        //* There will be categories for different voices ( experience )
        //* There will be another type of post targeted to lecturers? (maybe call it a feedback?)
    }
}