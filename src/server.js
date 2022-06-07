import express from "express"
import cors from "cors"
import universitiesRoutes from "./routes/universitiesRoutes.js"
import ratingPostsRoutes from "./routes/ratingPostsRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())


// api routes
app.use("/api/universities", universitiesRoutes)

app.use("/api/rating-posts", ratingPostsRoutes)

app.use("*", async (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Not found "
    })
})

export default app