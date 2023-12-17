import { nanoid } from 'nanoid'
import express from 'express';
import {client} from './../../mongodb.mjs' 
import { ObjectId } from 'mongodb'
import OpenAI from "openai";
import admin from 'firebase-admin'
import multer from 'multer';
import bodyParser from 'body-parser';
import { stringToHash, verifyHash } from "bcrypt-inzi";
import fs from 'fs';

let router = express.Router()
// const upload = multer()

const db = client.db("cruddb")
// const col =db.collection("posts")
// const userDB = db.collection("users");
const col = db.collection("usersAttendence");


// Multer configuration it upload pic file in to upload folder 
const storageConfig = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        console.log("mul-file: "+ file)
        cb(null,   `postImg-${new Date().getTime()}-${file.originalname}`)}
})

let upload =multer({storage: storageConfig});


// router.use(bodyParser.json());
// router.use(express.urlencoded({ extended: true }));

// https://firebase.google.com/docs/storage/admin/start
let serviceAccount={
    "type": "service_account",
    "project_id": "blog-website-pic-bucket",
    "private_key_id": "30e078a75668aa8fe956e4000d946c88d3b14ba7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0EMCcEeOHpWs1\n8Lk/3z5nu3dsRHCy2ouwqoMjnqalpOc+tWzxIz/GKMracGJgF40nAOpBloPGBEm3\nsqKXZQUm8ioBw4GQBIkPDZhv5j4DkRGPi+KYRjOzmD91yAJrfbPbptUqKJJtkDjx\n/7eegsoqKXGzzPpbwzCcyfeSD7mfUiC+tfvd9PQgfQ4WT6yBYfJAcaCTXtFpqEpQ\ngoCaohU4paROCgmUVYw4muhTUPqAef4HjfuOvKmOoqnx7tp82qd/GDaj1hFRqV6b\n0U54ZouXrnDIfWhErUHEFvcSoxfdP05LVIuaDRz+1q4VThWUzwUqsaYy1mOeUN7x\nNuFX7CBFAgMBAAECggEAEa3VY11kRASrPowIfCtsgp3Gz2P21rCbZ3iOUJh6jyfe\nJmuEqzZFRCzsIb9IAVw+mRY/abof7PitzjHlQc0C0PyUwECUP3IajNZOYaou64W6\nPihDUqUN3XO0w1kkV65rUsUSB8Yc/lHbLXNocVExDSuthLQ63niPFM3Fl1sg4/Hv\nqRosEkwmMyidxBgHuObSvT6uEXZbZWUjlsvVLqO2zwWTCPF6x+Etk9ofOFrQVsVM\n8HIBxfiKSEq4TaYWgDy76bbDrmTbaAwgbi1sv658P2HujOVMdnO4GcAxhHMGBcox\n6lbAJmFVl6mmS48I7mIGQN5BDwEoIXl2cT8XX+AIUQKBgQDXX5yHSOGZpPvYawLj\n57fI3sJQ+wBOU+gR9+2I4BQlA0X5bb+KDvnRv6jf3z2beL8jdNsZeSV76HskzfSD\n8SK377XqOrRskSIicWoSDIhG06qO7Eju64murL8tau+pJJqm0ZPl8Mxoqg9rUOn8\nY/08aZrW+TP3eadL1ndGsZFXTQKBgQDWCB1yakwgpFT9s9J4ZTSmRAINaANKGiA5\nJPGCe1v4QXQJEVN7Eg+9YCavsV0qaRRc5pGdHfPytqU3+1JHLPW8k7aq+X3f1l6D\n8k+5yAWou2oS9l62RQ9XbxkdZd/GS/DBeV4ywV0IZeqSeBvob9JV9RanOvqFqRCf\nWaDOJ02g2QKBgCPLVCx3xGbQsLqLLnPKMxVDUHA9BxP9hfhWiDfTZgWwwZRu1QKQ\n8pwVim+KnqaULtApv7BAHia1wKGhSR4UmXyQbl97Wjkg9ddbmhFd29hJnXMbehOb\nOcq6ExvtRd+KodlPw5DXsGFEwkNHs1urEo9TzdQknqpmoZNNFY2+PTWRAoGBAKF+\nmgl831g55s9PYd3qL2HNKudGtkSxleLIV1qnDewyJwW4hw7zv+CarlYfNDcN9olq\niDDPKwTWf6/P+HMwH3Nc2ZYEjs/YhpR0v2dk37BDSXRpZWmOjlbgw0iFV+Xd4xl5\nJHSTpkjx7Z769cParBCjz6X7QJCd0qcKD+W9jjtxAoGAYCfy8kFRastvbi7ZlvvJ\njqsX9adjADug+6iFkSyzLQCPn1YGFfh9mA4KxwbZQj0ujv3hQPt3JYYSwL2IkLV8\nUIBkexr4XG6yhh27mQauAMxoJgPcw3cqR1MnJrwI7oN8M9jbtG6jCfBL+so3rJWe\nM6zQIp2P5uZNRJknclsgACA=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-viejr@blog-website-pic-bucket.iam.gserviceaccount.com",
    "client_id": "110241618728506099293",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-viejr%40blog-website-pic-bucket.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const bucket = admin.storage().bucket("gs://blog-website-pic-bucket.appspot.com");

// const openaiClient = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });


// // https://baseurl.com/search?q=car


// router.get('/search', async (req, res,next) => {
//     // alert('Please enter')
//     try{
//         const response = await openaiClient.embeddings.create({
//             model: "text-embedding-ada-002",
//             input: req.query.p
//         })
//         const vector=response?.data[0]?.embedding
//         console.log(vector)
        

//    // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

//         // Query for similar documents.
//         const documents = await col.aggregate([
//             {
//                 "$search": {
//                     "index": "default",
//                     "knnBeta": {
//                         "vector": vector,
//                         "path": "embedding",
//                         "k": 10 // number of documents
//                     },
//                     "scoreDetails": true

//                 }
//             },
//             {
//                 "$project": {
//                     "embedding": 0,
//                     "score": { "$meta": "searchScore" },
//                     "scoreDetails": { "$meta": "searchScoreDetails" }
//                 }
//             }
//         ]).toArray();

//         documents.map(eachMatch => {
//             console.log(`score ${eachMatch?.score?.toFixed(3)} => ${JSON.stringify(eachMatch)}\n\n`);
//         })
//         console.log(`${documents.length} records found `);

//         res.send(documents);

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
     
// })

// // GET     /api/v1/profile

// router.get('/profile',async (req, res, next) => {
//     console.log('this is signup!', new Date());

  

//    try{
//     const result=await userDB.findOne({email:req.body.decoded.email});
//     console.log('result is the ', result);
//       res.send({
//         message:"This is profile",
//         data:{
//             isAdmin:result.isAdmin,
//             firstName: result.firstName,
//             lastName: result.lastName,
//             email: result.email
                   
//         }

//       });
//    }
//    catch(err){
//     console.log('error getting in mongodb', err)
//     res.status(500).send({message :"server does not respond! please try again later"});
//    }


// })


// POST    /api/v1/post

router.post('/post',async (req, res) => {
    console.log('this is signup!', new Date());
    
    
    if (
        !req.body.title
        || !req.body.text
    ) {
        res.status(403);
        res.send({message :`required parameters missing, 
        example request body:
        {
            title: "abc post title",
            text: "some post text"
        } `});
        return;
    }
try{
    const picURL = await userDB.findOne({email: req.body.decoded.email});     //fetch pic url from user db
   

// console.log("email "+ req.body.decoded.email)
    await col.insertOne({
        firstName: req.body.decoded.firstName,
        lastName: req.body.decoded.lastName,
        url: picURL.url,
        title:req.body.title,
        text:req.body.text,
        email:req.body.decoded.email,
        authorId:new ObjectId(req.body.decoded._id),
        createdAt:new Date()
      });

    res.send({message :'post created'});
}
catch (err) {
    res.send("post does not done")
    console.log(err)
}
    
})


// GET     /api/v1/posts      it fetch only the post of login user 
router.get('/postInd',async (req, res, next) => {
    console.log('this is signup!', new Date());
    const userId= req.query._id || req.body.decoded._id
    console.log(userId)
    if(!ObjectId.isValid(userId)){
        res.status(403).send("invalid user id");
    }

    
    const cursor = col.find({authorId :new ObjectId(userId)}) .sort({ _id: -1 })
    .limit(100);
    try{
        let postArray =await cursor.toArray();
        console.log('result', postArray)
        res.send(postArray);
    }
    catch(error){
        console.log('error getting in mongodb', error)
        res.status(500).send({message :"server does not respond! please try again later"});
    }
    

})


//------------------take URL of profile pic from firebase and save in mongodb -----------------------

router.put('/postPic', (req, res, next) => {
    req.decoded = { ...req.body.decoded }
    next();
},
    upload.any() 
,async (req,res,next) => {

try{

     const { email, URL } = req.body;      //destructuring of object kari ha
    //  console.log("req.body :" +req.body);
    //  console.log("req.file :" +req.files);
    //  console.log("uploaded file name " + req.files[0].originalname   )
    //  console.log("server give file name " + req.files[0].filename )

     if(req.files[0].size > 2000000){    //2 MB
        res.send({result :"Give file size less than 2MB"})
     }

     bucket.upload(
        req.files[0].path,
        {
         destination: `profile/${req.files[0].filename}`,

        },

        function (err, file, apiResponse) {
            if(!err){
                file.getSignedUrl({
                    action: 'read',
                    expires : '03-09-2050'
                }).then ( async (urlData ,err)=>{
                    if(!err){
                       console.log("public downableUrl of profile pic is :" ,urlData[0]);
                       const userEmail =req.decoded.email;
               
                     


                       try{
                        let url ={url :urlData[0]};
                        
                        const response =await userDB.updateOne({email: userEmail},{$set: url})
                            console.log("updated" + JSON.stringify(response));
                            res.send({message :"Picture Added Successfully",
                                  
                        
                        } )

                        
                       }
                       catch (e) {
                        console.log("error inserting mongodb: ", e);
                        res.status(500).send({ message: 'server error, please try later' });
                    }
                    // // delete file from folder before sending response back to client (optional but recommended)
                            // // optional because it is gonna delete automatically sooner or later
                            // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder

                            try {
                                fs.unlinkSync(req.files[0].path)
                                //file removed
                            } catch (err) {
                                console.error(err)
                            }
                           
                    }
                    else {
                        console.log("err: ", err)
                        res.status(500).send({
                            message: "server error"
                        });
                    }
                }) 
            }
        }
        )

}
catch(error){
    console.log('Error:', error);
}

})

         //-----------------Add student in mongodb -----------------------




 router.post('/addStudent', (req, res, next) => {
            req.decoded = { ...req.body.decoded };
            next();
        }, upload.any(), async (req, res, next) => {
            try {
                let { firstName, lastName, course, email, password, number, URL } = req.body;
                console.log("req.files:", req.files);
                console.log("uploaded file name: " + req.files[0].originalname);
                console.log("server gives file name of: " + req.files[0].filename);
                console.log("server gives file name of: " + firstName);
        
                if (req.files[0].size > 2000000) { // 2 MB
                    res.send({ result: "Give file size less than 2MB" });
                    return;
                }
        
                bucket.upload(
                    req.files[0].path,
                    {
                        destination: `profileHackathon/${req.files[0].filename}`,
                    },
                    async function (err, file, apiResponse) {
                        if (err) {
                            console.error("Error uploading to bucket:", err);
                            res.status(500).send({ message: "Error uploading file to storage" });
                            return;
                        }
        
                        try {
                            const urlData = await file.getSignedUrl({
                                action: 'read',
                                expires: '03-09-2050'
                            });
        
                            console.log("public downloadable URL of cover pic is:", urlData[0]);
                            email = email.toLowerCase();
        
                            const result = await col.findOne({ email: email });
                            const hashPassword = await stringToHash(password);
        
                            if (!result) {
                                await col.insertOne({
                                    isAdmin: false,
                                    firstName: firstName,
                                    lastName: lastName,
                                    course: course,
                                    email: email,
                                    password: hashPassword,
                                    number: number,
                                    url: urlData[0],
                                    createdOn: new Date(),
                                });
        
                                res.send({ message: "User Is Added Successfully In Database" });
                                console.log('User is added successfully in the database');
                            } else {
                                res.status(403).send({ message: "User is Already Exists For This Email Address" });
                                console.log('User already exists from this email address');
                            }
        
                            try {
                                fs.unlinkSync(req.files[0].path);
                            } catch (err) {
                                console.error(err);
                            }
                        } catch (e) {
                            console.log("Error getting signed URL or inserting into MongoDB:", e);
                            res.status(500).send({ message: 'Server error, please try later' });
                        }
                    }
                );
        
                // const newURL = URL.slice(5);
                // console.log('Email:', email);
                // console.log('URL:', newURL);
        
                // res.send({ newURL: "hh " + newURL });
            } catch (error) {
                console.log('Error:', error);
                res.status(500).send({ message: 'Server error, please try later' });
            }
        });
                





         //------------------get url of pic from mongodb -----------------------
router.get('/getPicURl',async (req, res,next)=>{
    try{
       const picURL=await userDB.findOne({email:req.body.decoded.email});
       console.log(picURL)
       res.send(picURL)
    }
    catch(error){
        res.send(error.message)
    }
})

// it fetch all post of user
router.get('/students',async (req, res, next) => {
    console.log('this is signup!', new Date());

    
    const cursor = col.find() .sort({ _id: -1 })
    .limit(100);
    try{
        let studentArray =await cursor.toArray();
        console.log('result', studentArray)
        res.send(studentArray);
    }
    catch(error){
        console.log('error getting in mongodb', error)
        res.status(500).send({message :"server does not respond! please try again later"});
    }
    

})

// GET     /api/v1/post/:postId
router.get('/post/:postId',async (req, res, next) => {
    console.log('this is signup!', new Date());

    // if (isNaN(req.params.postId)) {
    //     res.status(403).send(`post id must be a valid number, no alphabet is allowed in post id`)
    // }
//     let i
    let getId=req.params.postId
    let getIdupdate=getId.slice(1)
//    console.log(getIdupdate)
if (!ObjectId.isValid(getIdupdate)) {
    res.status(403).send({message :`Invalid post id`});
    return;
}

   try{
    const post=await col.findOne({_id: new ObjectId(getIdupdate)});
      res.send(post);
   }
   catch(err){
    console.log('error getting in mongodb', err)
    res.status(500).send({message :"server does not respond! please try again later"});
   }
})


//get             fetch the profile  of the user
const submitProfileHandler =async (req, res,next) => {
    const userId = req.params.userId || req.body.decoded._id ;
    if(!ObjectId.isValid(userId)){
        res.status(403).send("Invalid user ID");
        return
    }

    try{
      const result= await col.findOne({_id:new ObjectId(userId)})
      console.log(result);
      res.status(200).send({message: "profile is fetched",
                data:{
                    isAdmin: result?.isAdmin,
                    firstName: result?.firstName,
                    lastName: result?.lastName,
                    email: result?.email,
                    _id:result?.id
                }
    })
    }
    catch(err){

        console.log("error getting in mongodb ",err)
        res.status(500).send("error getting in mongodb please try again later")
}
}

router.get("/profile", submitProfileHandler)
router.get("/profile/:userId", submitProfileHandler)






// PUT     /api/v1/post/:userId/:postId
router.put('/post/:postId',async (req, res, next) => {
    const getId = req.params.postId;
    // const updateId=getId.slice(1)   this line is run when we use thunder client
    // console.log(getId);
    // new ObjectId(updateId)
    if(!ObjectId.isValid(getId)){
        res.status(500).send({message :"post not found with this id"})
    }
    if(!req.body.title && !req.body.text){
        console.log("not any fiels is given");
        res.status("22").send({message :"please enter one field for updation"});
    }
    let updateWork ={title:"",text:""};
    if(req.body.title && req.body.text){
        updateWork.title = req.body.title
        updateWork.text = req.body.text
    }
    if(!req.body.text){updateWork.title = req.body.title}
    if(!req.body.title){updateWork.title = req.body.text}
    try{
        

         const update=await col.updateOne({_id:new ObjectId(getId)},{$set :updateWork})
            console.log("update " +update)
            res.send({message :'post is  updated successfully'})
    }
    catch(error){

    }

//     for (let i = 0; i < posts.length; i++) {
//         if (posts[i].id === getId.slice(1)) {
//             let titles = posts[i].title;
//             let texts = posts[i].text;

//             // Check if both title and text are missing in the request body
//             if (!req.body.title && !req.body.text) {
//                 return res.status(400).send("Both title and text are missing in the request.");
//             }

//             // Update the post properties if title is provided
//             if (req.body.title) {
//                 titles = req.body.title;
//             }

//             // Update the post properties if text is provided
//             if (req.body.text) {
//                 texts = req.body.text;
//             }

//             // Update the post in the array
//             posts[i] = {
//                 id: posts[i].id,
//                 title: titles,
//                 text: texts
//             };

//             // Send a success response
//             return res.send({
//                 id: posts[i].id,
//                 title: titles,
//                 text: texts
//             });
//         }
//     }

//     // If the loop completes without finding a matching post, send a not found response
//     res.status(404).send('Post not found with this ID.');
});
// DELETE  /api/v1/post/:userId/:postId
router.delete('/post/:postId',async (req, res, next) => {
    console.log('this is signup!', new Date());
 
    let getId=req.params.postId
    console.log('getId', getId)
     getId=getId.slice(1)
if(!ObjectId.isValid(getId)){
    res.status(500).send({message :"post not found with this id"})
}

try{
    
    let deletedItem=await col.deleteOne({_id : new ObjectId(getId)})
    // amount deleted code goes here
console.log("Number of documents deleted: " + deletedItem);

res.send({message :"post is deleted of "+ req.params.postId})


}
catch(error){
     console.log(error)
}
    // let getId=req.params.postId
   

    //  for (let i=0 ;i<posts.length;i++){
    //     if(posts[i].id === getId.slice(1)){
    //         // res.send(posts[i])
    //         posts.splice(i,1)
    //         res.send("post delete of id "+ getId.slice(1))

    //         return
    //     }
    //  }



    // res.send('post not found with this index');
})

export default router



