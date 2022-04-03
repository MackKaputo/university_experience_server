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
        const universities = await universitiesCollection
            .find({})
            .toArray()
        
        console.log(`universities found: `, universities)
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