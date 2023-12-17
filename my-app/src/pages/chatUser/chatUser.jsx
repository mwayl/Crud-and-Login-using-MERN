import React, {useRef,useState,useContext,useEffect} from "react";
import "./chatUser.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from "../../core";


function ChatUser(){
    const navigate = useNavigate();
    const inputNameRef=useRef(null)
    const [loading, isLoading] = useState(false);
    const [users , addUsers] =useState([])
    const [userId, setUserId] = useState("")

    useEffect(() =>{
        getAllUserName()

        return () => {};
    },[])

    //------------------------ get specific user name --------------------------
const getAllUserName=async () => {
      console.log("getUserName"+ inputNameRef.current.value)
      try{
        const userResponse = await axios.get(`${baseUrl}/api/v1/allUser`,{
            withCredentials:true,
        })
        console.log(userResponse.data)
        addUsers(userResponse.data)
      }
      catch (error) {

      }

}


   //------------------------ get specific user name --------------------------

const getSpecificUser = async (e)=>{
       e.preventDefault()
       const userName =inputNameRef.current.value
       console.log(userName)
       try{
         const response =await axios.get(`${baseUrl}/api/v1/searchName?p=${userName}`)

         console.log("response    "+response.data)
         addUsers(response.data)

       }
       catch(error) {
      console.log("error is :"+error)
       }
} 

const handleClick = (userId) => {
    // Your event logic goes here
    alert('Div clicked! You can perform your desired action here.'+userId);

    navigate(`/chat`, { id: { id: userId } });

  };

    return(
        <div>
            <h1>User Page</h1>

            <form className="search-form1" id="inputForm" onSubmit={getSpecificUser}>
                <input type="text" className="search-bar1" placeholder="Enter User Name" name="userName" ref={inputNameRef} />
                <button type="submit" className="search-bar-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
          </button>
            </form>

           {users.map((user) => (
            <div className="contact" value={user._id} onClick={()=>handleClick(user._id)}>
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
            </div>
))}
        </div>
    )
}

export default ChatUser;