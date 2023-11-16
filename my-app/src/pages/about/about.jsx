import React, { useEffect, useState,useContext } from "react";
import "./about.css";
import axios from "axios";
import { baseUrl } from "../../core";
import { GlobalContext } from "../../context/context";
function About(){
    const [posts,allPosts]=useState([])
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const { state, dispatch } = useContext(GlobalContext);

const individualPostHandler=async function(){
    try{
    const response =await axios.get(`${baseUrl}/api/v1/postInd`,{
        withCredentials: true,
    })
    console.log(response.data)
    allPosts(response.data)
}
catch(err){
  console.log(err)
}

}
useEffect(()=>{
    individualPostHandler()
    console.log("name is ",state.user.firstname)
},[toggleRefresh])

const deletePostHandler =async (postId)=>{
    console.log("kkkkkkkkkkkk", postId)
    try{
const response =await axios.delete(`${baseUrl}/api/v1/post/:${postId}`,{
    withCredentials:true
});
console.log(response);
setToggleRefresh(!toggleRefresh)
    }
    catch(err){
  console.log(err);
  setToggleRefresh(!toggleRefresh)
    }

}

    return(
        <div>
            <h1>Profile Page</h1>
          <div>
            <div className="profile-div">
               <div className="profile-pic"></div>
               <div className="profile-information">
                <h1>{state.user.firstname+" " + state.user.lastname}</h1>
                <h3>{state.user.email}</h3>
               </div>
            </div>
          <div className="postDisplay">
            <p className="allBlog">All Blog</p>
            {posts.map((post,index)=>(
                <div key={post._id} className="post">
               { post.isEdit ? 
               <form>
                <input type="text" hidden value={post._id} disable ></input>
                <input type="text"  defaultValue={post.title} required minLength={20} maxLength={200} id="postTitleInput"></input>
                <input type="text"  defaultValue={post.text} required minLength={200} maxLength={2000} id="postTextInput"></input>
                <button type="submit" className="save-button" >Save</button>
                <button type="button" className="cancel-button" onClick={(e)=>{
                         post.isEdit=false;
                          allPosts([...posts])
                }}>Cancel</button>
               </form>
                 
                :
                <div>
                <h2 className="title">{post.title}</h2>
                <p className="text">{post.text}</p>
                <div className="lowerDiv">
                <button type="button" onClick={()=>{
                    deletePostHandler(post._id);
                }}>delete</button>
                <button type="button" onClick={(e)=>{
                         post[index].isEdit=true;
                          allPosts([...posts])
                }}>Edit</button>
                </div>
                </div>
                }
            </div>
            )
            

            )}
            </div>
          </div>
        </div>
    )
}

export default About;