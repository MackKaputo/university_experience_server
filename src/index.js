import path from "path"
import dotenv from "dotenv"
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env")})
import { MongoClient } from "mongodb"
import UniversitiesDAO from "./dao/universitiesDAO.js"

import app from "./server.js"

const PORT = process.env.PORT || 4000


MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.catch((err) => {
    console.error(err.stack)
    process.exit(1)
})
.then(async (client) => {
    await UniversitiesDAO.injectDB(client)

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`)
    })
})