import express from 'express'
import path from 'path'
let router=express.Router()
const __dirname = path.resolve();

router.get('/comment/:postId/:commentId',(req,res,next)=>{
    // console.log("the comment post of userid and same commentid"+new Date())
    // res.send("the comment post of userid and same commentid")

    res.sendFile(path.join(__dirname,'html and css v1/commentv1.html'))
})


router.get('/comment/:postId/:commentId',(req,res,next)=>{
    console.log("the comment post of userid and same commentid"+new Date())
    res.send("the comment post of userid and same commentid")


})

router.post('/comment',(req,res,next)=>{
    console.log("the comment post "+new Date())
    res.send("the comment post")
})

router.put('/comment/:postId/:commentId',(req,res,next)=>{
    console.log("the comment post of userid and same commentid"+new Date())
    res.send("the comment post of userid and same commentid")
})

router.delete('/comment/:postId/:commentId',(req,res,next)=>{
    console.log("the comment post is delete"+new Date())
    res.send("the comment post is delete")
})


export default router





// GET     /v1/comment/:userId/:commentId
// GET     /v1/comments/:userId
// POST    /v1/comment
// PUT     /v1/comment/:userId/:commentId
// DELETE  /v1/comment/:userId/:commentId