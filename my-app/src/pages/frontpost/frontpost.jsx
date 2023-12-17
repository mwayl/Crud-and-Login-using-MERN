import React from "react";
import { useRef, useState, useEffect,useContext } from "react";
import axios from "axios";
import "./frontpost.css";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";

import { baseUrl } from "../../core";

const Home = () => {
  const postTitleInputRef = useRef(null);
  const postTextInputRef = useRef(null);
  const postSearchInputRef = useRef(null); //it search the post
  // const postTitleEditInputRef=useRef(null);
  // const postTextEditInputRef=useRef(null);
  const [loading, isLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [profile, setProfile] = useState(null);
  const [post, allPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);

  const { userId } = useParams();

  const getAllPosts = async () => {
    try {
      isLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/post`, {
        withCredentials: true,
      });

      isLoading(false);
      console.log(response.data);
      allPosts(response.data);
      //   console.log(allPosts)
    } catch (error) {
      console.log(error.data);
      isLoading(false);
    }
  };
  useEffect(() => {
    console.log("name ",state.user._id)
    getAllPosts();
 

    return () => {};
  }, [toggleRefresh]);


  const searchPostHandler = async (event) => {
    event.preventDefault();
    try {
      isLoading(true);
      const searchItem = postSearchInputRef.current.value;
      const response = await axios.get(
        `${baseUrl}/api/v1/search?p=${searchItem}`
      );
      console.log(response.data);

      isLoading(false);
      allPosts([...response.data]);
    } catch (e) {
      console.log(e);
      isLoading(false);
    }
  };
  // const submitPost= (event)=>{
  //     alert("Submit")
  // }
  return (
    <div>
      <h1 className="heading">Blogging App</h1>
      {/* <h1>{state.user._id}</h1> */}

      <div className="big-div front-post">
        <form onSubmit={searchPostHandler} className="search-form1" >
          <input
            type="text"
            placeholder="Search..."
            className="search-bar1"
            ref={postSearchInputRef}
          ></input>
          <button className="search-bar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
          </button>
        </form>
       
        <div>
          <div className="postDisplayUnauth">
            {/* <p className="allBlog">All Blog </p> */}

            {post.map((posts, index) => (
              <div key={posts._id} className="post">
                
                  <div>
                    <h2 className="title">{posts.title}</h2>
                    <p className="text">{posts.text}</p>
                   
                  </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
