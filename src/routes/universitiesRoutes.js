import express from "express"
import UniversitiesDAO from "../dao/universitiesDAO.js"

const router = express.Router()

router.get("/", async (req, res) => {

    let response = await UniversitiesDAO.getUniversities()

    return res.status(200).json(response)
})


export default router