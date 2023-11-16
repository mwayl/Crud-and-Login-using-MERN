import express from 'express'
let router =express.Router()

import authRouter from './routes/auth.mjs' 
import postRouter from './routes/post.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'

router.use(authRouter)

// router.use((req,res,next)=>{
    
//         next()
  
// })

router.use(postRouter)
router.use(commentRouter)
router.use(feedRouter)


export default router
// GET     /api/v1/post/:userId/:postId
// GET     /api/v1/posts/:userId
// POST    /api/v1/post
// PUT     /api/v1/post/:userId/:postId
// DELETE  /api/v1/post/:userId/:postId

// GET     /v1/comment/:userId/:commentId
// GET     /v1/comments/:userId
// POST    /v1/comment
// PUT     /v1/comment/:userId/:commentId
// DELETE  /v1/comment/:userId/:postId


// GET     /feed/:userId