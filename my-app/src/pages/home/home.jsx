import React from "react";
import { useRef, useState, useEffect ,useContext} from "react";
import axios from "axios";
import "./home.css";
import profilePic from "../../assests/random profile.jpg"

import { baseUrl } from "../../core";
import { GlobalContext } from "../../context/context";
import { stat } from "fs";

const Home = () => {
  const postTitleInputRef = useRef(null);
  const postTextInputRef = useRef(null);
  const postSearchInputRef = useRef(null); //it search the post
  // const postTitleEditInputRef=useRef(null);
  // const postTextEditInputRef=useRef(null);
  const [loading, isLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [post, allPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  // const [selectedImage, setSelectedImage] = useState('');
  const [time ,setTime] = useState("");
  const {state,dispatch} = useContext(GlobalContext)
  // console.log(postTitleInputRef)
  const getAllPosts = async () => {
    try {
      isLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/post`, {
        withCredentials: true,
      });

      isLoading(false);
      console.log(response.data);
      // getProfilePicture();
      allPosts(response.data);
     
      //   console.log(allPosts)
    } catch (error) {
      console.log(error.data);
      isLoading(false);
    }
  };
  useEffect(() => {
    getAllPosts();
    // getProfilePicture();

    return () => {};
  }, [toggleRefresh]);

  const submitPostHandler = async (event) => {
    event.preventDefault();
    // alert("Submit")
    try {
      isLoading(true);
      setAlert(null);
      const response = await axios.post(
        `${baseUrl}/api/v1/post`,
        {
          title: postTitleInputRef.current.value,
          text: postTextInputRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      isLoading(false);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh);
      console.log(response.data);
    } catch (error) {
      isLoading(false);
      console.log(error.data);
    }
  };

  const deletePost = async (id) => {
    // id="_"+id;
    console.log(id);

    try {
      isLoading(true);
      const response = await axios.delete(`${baseUrl}/api/v1/post/:${id}`, {
        withCredentials: true,
      });
      console.log(response.data);
      setToggleRefresh(!toggleRefresh);
      isLoading(false);
    } catch (error) {
      console.log(error.data);
      setToggleRefresh(!toggleRefresh);
      isLoading(false);
    }
  };

  // const editPost=async (id) =>{

  // console.log(postTitleEditInputRef.current.value)
  // }
  const SubmitEditPostHandler = async (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const title = e.target.elements[1].value;
    const text = e.target.elements[2].value;

    console.log("id is " + id + "title is" + title, "text s " + text);
    try {
      isLoading(true);
      const response = await axios.put(
        `${baseUrl}/api/v1/post/${id}`,
        {
          title: title,
          text: text,
        },
        {
          withCredentials: true,
        }
      );

      isLoading(false);
      console.log(response.data);
      // setAlert(response?.data?.message);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error.data);
      isLoading(false);
    }
  };

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
  const submitPost= (event)=>{
      alert("Submit")
  }

  // const getProfilePicture = async () => {
  //   try {
  //     const picURL = await axios.get(`${baseUrl}/api/v1/getPicURl`, {
  //       withCredentials: true
  //     });
  
  //    if(!picURL.data.url){
  //  setSelectedImage(profilePic)
  //    }
  //    else{
  //     setSelectedImage(picURL.data.url)
  //    }
      
  // //  setSelectedImage(picURL.data.url)
  //     // Logging the URL and its type
  //     console.log("the url is ", picURL.data.url);
  //     console.log("the type off is ", typeof(picURL.data.url));
  //     console.log("the url in state", selectedImage);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  
// const postingTime = (postTime)=>{
//      const dateObject = new Date(postTime)
//      const nowDate =new Date().getTime();
//      const postDuration =nowDate-dateObject
//     const min =Math.floor(postDuration/(1000 * 60))
//     const hour =Math.floor(postDuration/(1000 * 60 * 60))
//     const day =Math.floor(postDuration/(1000 * 60 * 60 * 24))
//     const month =Math.floor(postDuration/(1000 * 60 * 60 * 24 * 30))
//     if(min < 60){
//       setTime(min)
//     }
//     else if(hour < 12){
//       setTime(hour)
//     }
//     else if(day < 30){
//       setTime(day)
//     } 
//     else {
//       setTime(month)
//     }

//      console.log(postDuration, "min", min, "hour", hour,"day",day ,"month",month);
// }

  
  return (
    <div>
      <h1 className="heading-main">Blogging App</h1>

      <div className="big-div1">
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
        <form onSubmit={submitPostHandler} className="posting1">
          {/* <label htmlFor='postTitleInput'>Title:</label> */}
          <input
            type="text"
            // id="postTitleInput"
            placeholder="Enter title of Post"
            required
            minLength={2}
            maxLength={100}
            ref={postTitleInputRef}
            className="headingOfPost"
          />

          {/* <label htmlFor='postTextInput'>Title:</label> */}
          <textarea
            // id="postTextInput"
            placeholder="Enter a post"
            required
            minLength={2}
            maxLength={7000}
            ref={postTextInputRef}
            className="discriptionOfPost"
          ></textarea>
          <button type="submit" className="submit">
            Submit
          </button>
          <span>
            {alert && alert}{" "}
            {/*when alert is true message is render on screen */}
            {loading && "Loading..."}
          </span>
        </form>
        <div>
          <div className="post-Display">
            <p className="allBlog">All Blog</p>

            {post.map((posts, index) => (
              <div key={posts._id} className="post">
                {posts.isEdit ? (
                  <form onSubmit={SubmitEditPostHandler}>
                    <input
                      type="text"
                      disabled
                      value={posts._id}
                      hidden
                    ></input>
                    <input
                      type="text"
                      id="postTitleInput"
                      placeholder="Enter title of Post"
                      defaultValue={posts.title}
                      required
                      minLength={2}
                      maxLength={100}
                    ></input>
                    <textarea
                      id="postTextInput"
                      placeholder="Enter a post"
                      required
                      minLength={2}
                      maxLength={7000}
                      defaultValue={posts.text}
                    ></textarea>

                    <button type="submit" className="save-button">Save</button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={(e) => {
                        // Set isEdit to false to exit edit mode
                        posts.isEdit = false;
                        allPosts([...post]); // Assuming allPosts is a function to update the state
                      }}
                    >
                      Cancel
                    </button>

                    <span>
                      {alert && alert}{" "}
                      {/*when alert is true message is render on screen */}
                      {loading && "Loading..."}
                    </span>
                  </form>
                ) : (
                  <div>
                  <div className="profileInfoDiv">
                    <div className="profilePicture">
                    {posts.url === null  ?

                    <img src={profilePic} alt="not found" id="dynamicPic" style={{width: '45px' ,height: '45px', borderRadius:"50px"}}></img>
                    :<img src={posts.url} alt="not found" id="dynamicPic" style={{width: '45px' ,height: '45px',borderRadius:"50px"  }}></img>}

                    {/* {selectedImage && 
                    (<img src={selectedImage} alt="not found" id="dynamicPic" style={{width: '37px' ,height: '37px',borderRadius:"50px"}}></img>)
                    } */}
                     {/* {posts.url && 
                   (<img src={posts.url} alt="not found" id="dynamicPic" style={{width: '37px' ,height: '37px',borderRadius:"50px"}}></img> )} */}
                    </div>
                 
                    <div className="accountName" >{posts.firstName+" " + posts.lastName}</div>
                    <div className="accountEmail">{posts.email} . 2d</div>
                    
                    {/* <div className="postingTime" onLoad={postingTime(posts.createdAt)}></div> */}
                  </div>
                  {/* <hr style={{marginTop:"12px"}}></hr> */}
                  <div className="contentDiv">
                    <h2 className="title">{posts.title}</h2>
                    <p className="text">{posts.text}</p>
                    </div>
                    <div className="lowerDiv">
                      <button
                        onClick={(e) => {
                          deletePost(posts._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          // Set isEdit to true to enter edit mode
                          post[index].isEdit = true;
                          allPosts([...post]); // Assuming allPosts is a function to update the state
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
