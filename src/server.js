import express from "express"
import UniversitiesDAO from "./dao/universitiesDAO.js"

const app = express()


// api routes
app.get("/", async (req, res) => {
    await UniversitiesDAO.getUniversities()
    res.send("Hello there, here server")
})

export default app