import express from 'express'


let routerv2=express.Router()

import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'


routerv2.use(authRouter)



routerv2.use(postRouter)
routerv2.use(commentRouter)
routerv2.use(feedRouter)


export default routerv2