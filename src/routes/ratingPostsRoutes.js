import express from "express"
import ratingPostsDAO from "../dao/ratingPostsDAO.js"
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.get("/", async (req, res) => {

    try {

        let response = await ratingPostsDAO.getRatingPost()

        return res.status(200).json({
            success: true,
            code: 200,
            locale:"en",
            message: "ok",
            data: response
        })
        

    } catch (error) {
        console.log(error)
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
        //TODO: you can't trust anything coming from the user! req.body needs to be checked!
        console.log("Rating post being inserted... ", req.body)

        let insertResponse = await ratingPostsDAO.createRatingPost({
            uuid: uuidv4(),
            ...req.body, 
            created_at: Date.now(),
            updated_at: Date.now(),
            deleted_at: null
        })

        if(insertResponse.success) {

            return res.status(201).json({
                success: true,
                code: 201,
                message:"ok",
                message: insertResponse
            })

        } else {
            return res.status(500).json({
                success: false,
                locale:"en",
                code: 500,
                message: "Sorry, something went wrong",
                data: null
            })
        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            locale:"en",
            code: 500,
            message: "Sorry, something went wrong",
            data: null
        })
    }
})

router.patch("/comments")







export default router