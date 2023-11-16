import express from 'express'
import path from 'path'
let router=express.Router()
const __dirname = path.resolve();

router.get("/feed/:userId",(req,res,next)=>{
    // console.log("feed is showed"+new Date())
    // res.send("feed is showed")

    res.sendFile(path.join(__dirname,'html and css v1/feedv1.html'))
})

export default router

// GET     /feed/:userId