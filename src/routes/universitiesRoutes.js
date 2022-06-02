import express from "express"
import UniversitiesDAO from "../dao/universitiesDAO.js"
import { v4 as uuidv4 } from 'uuid'

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

        if(!response.success) {
            return res.status(404).json({
                success: false,
                locale:"en",
                code: 404,
                message: "Could not get requested university",
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            locale:"en",
            message: "ok",
            data: response.data
        })

    } catch (error) {

        console.error(`Something went wrong while processing university data`, error)

        return res.status(500).json({
            success: false,
            locale:"en",
            code: 500,
            message: "Sorry, something went wrong while getting the university",
            data: null
        })
    }

})

router.post("/", async (req, res) => {
    try {
        console.log("university to insert: ",req.body)
        const insertResponse = await UniversitiesDAO.createUniversity({
            uuid: uuidv4(),
            ...req.body,
             created_at: new Date(),
             updated_at: new Date(),
             deleted_at: null
        })
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

router.delete("/:id", async (req, res) => {
    try {
        console.log("Deleting university with id: ", req.params.id)

        const deleteResponse = await UniversitiesDAO.deleteUniversity(req.params.id)
        if (deleteResponse.success) {

            return res.status(200).json({
                success: true,
                locale:"en",
                code: 200,
                message: `University with id ${req.params.id} was deleted `
            })
        }

        return res.status(400).json({
            success: false,
            locale:"en",
            code: 400,
            message: `Sorry, University with id ${req.params.id} could not be deleted`,
            data: null
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