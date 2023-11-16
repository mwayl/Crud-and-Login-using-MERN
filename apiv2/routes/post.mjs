import express from 'express'
import path from 'path'
let router=express.Router()
const __dirname = path.resolve();

router.get("/post/:userId/:postId",(req,res,next)=>{
    // console.log("reterive post which userid and postid same of version 2"+ new Date())
    // res.send("reterive post which userid and postid same of version 2")

    res.sendFile(path.join(__dirname,'html and css v2/postaddv2.html'))
})

router.get("/post/:userId",(req,res,next)=>{
    // console.log("reterive post which userid same of version 2"+ new Date())
    // res.send("reterive post which userid same of version 2")

    res.sendFile(path.join(__dirname,'html and css v2/postdeletev2.html'))
})

router.post("/post",(req,res,next)=>{
    console.log("post cerated of version 2"+ new Date())
    res.send("post cerated of version 2")
})

router.put("/post/:userId/:postId",(req,res,next)=>{
    console.log("update post which userid and postid same of version 2"+ new Date())
    res.send("update post which userid and postid same of version 2")
})

router.delete("/post/:userId/:postId",(req,res,next)=>{
    console.log("delete the post of version 2"+ new Date())
    res.send("delete the post of version 2")
})


export default router





