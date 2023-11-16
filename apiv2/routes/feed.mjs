import express from 'express'
import path from 'path'
let router=express.Router()
const __dirname = path.resolve();

router.get("/feed/:userId",(req,res,next)=>{
    // console.log("feed is showed version 2"+new Date())
    // res.send("feed is showed version 2")

    res.sendFile(path.join(__dirname,'html and css v2/feedv2.html'))
})

export default router

// GET     /feed/:userId