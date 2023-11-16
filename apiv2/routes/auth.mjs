import express from 'express'
import path from 'path'
let router=express.Router()
const __dirname = path.resolve();

router.get('/login',(req,res,next)=>{
    // console.log("hello i am login of V2")
    // res.send("hello i am login of V2")

    res.sendFile(path.join(__dirname,'html and css v2/loginv2.html'))
    
})

router.get('/signup',(req,res,next)=>{
    // console.log("this is signup v2" + new Date())
    // res.send("this is signup v2"+new Date())

    res.sendFile(path.join(__dirname,'html and css v2/signinv2.html'))
    
})

export default router;