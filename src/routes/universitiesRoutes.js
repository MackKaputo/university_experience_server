import express from "express"
import UniversitiesDAO from "../dao/universitiesDAO.js"

const router = express.Router()

router.get("/", async (req, res) => {

    let response = await UniversitiesDAO.getUniversities()

    return res.status(200).json(response)
})



router.get("/:id", async (req, res) => {

    try {

        let response = await UniversitiesDAO.getUniversityById(req.params.id)

        if(response.error) {
            return res.status(404).json({ message: response.message})
        }

        return res.status(200).json({
            success: true,
            data: response
        })

    } catch (error) {

        console.error(`Something went wrong while processing university data`, error)

        return res.status(500).json({
            error: true,
            message: "Sorry, something went wrong"
        })
    }

})


export default router