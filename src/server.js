import express from "express"
import UniversitiesDAO from "./dao/universitiesDAO.js"
import cors from "cors"
import universitiesRoutes from "./routes/universitiesRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())


// api routes
app.use("/universities", universitiesRoutes)

app.use("*", async (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Not found "
    })
})

export default app