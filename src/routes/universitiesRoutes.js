import express from "express"
import UniversitiesDAO from "../dao/universitiesDAO.js"

const router = express.Router()

router.get("/", async (req, res) => {

    try {

        let response = await UniversitiesDAO.getUniversities()

        return res.status(200).json({
            success: true,
            code: 200,
            locale:"en",
            message: "ok",
            data: response
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            locale:"en",
            code: 500,
            message: "Sorry, something went wrong",
            data: null
        })
    }
})



router.get("/:id", async (req, res) => {

    try {

        let response = await UniversitiesDAO.getUniversityById(req.params.id)

        if(response.error) {
            return res.status(404).json({
                success: false,
                locale:"en",
                code: 404,
                message: response.message,
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            locale:"en",
            message: "ok",
            data: response
        })

    } catch (error) {

        console.error(`Something went wrong while processing university data`, error)

        return res.status(500).json({
            success: false,
            locale:"en",
            code: 500,
            message: "Sorry, something went wrong",
            data: null
        })
    }

})

router.post("/", async (req, res) => {
    try {
        console.log("university to insert: ",req.body)
        const insertResponse = await UniversitiesDAO.createUniversity(req.body)
        console.log("Inserting university....", insertResponse)

        res.status(200).json({
            success: true,
            code: 201,
            message:"ok",
            message: insertResponse
        })
        
    } catch (error) {

        console.error(`Something went wrong while processing university data`, error)

        return res.status(500).json({
            success: false,
            locale:"en",
            code: 500,
            message: "Sorry, something went wrong",
            data: null
        })
    }
})


export default router