import React, { useEffect, useContext } from "react";
// import logo from './logo.svg';
import "./App.css";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import FrontPost from "./pages/frontpost/frontpost";
import { GlobalContext } from "./context/context";
// import { baseUrl } from "../core";
import {baseUrl} from "./core"
// import { json } from "express"
// import {splash_pic} from "./assests/splash screen.gif" 
// import {splash_pic} from "./assests/splashScreen";



function App() {

  //  const [isLogin, setIsLogin]=useState(false)
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(()=>{
     axios.interceptors.request.use(
      function(config){
        config.withCredentials=true;
        return config
      },
      function (error){
        return Promise.reject(error);
      }

     )
  },[])



  useEffect(() => {
  
    const checkUserLoginStatus = async () => {
      console.log('Checking user login status')
      try {
        const response = await axios.get(`${baseUrl}/api/v1/profile`, {
          withCredentials: true,
        });
        // setIsLogin(true);
        dispatch({
          type: "USER_LOGIN",
          payload:response.data.data
        });

        // console.log("where is hhh "+response.data.);
      } catch (error) {
        console.log("error is come in app use effect ",error);
        dispatch({
          type: "USER_LOGOUT",
        });
        // setIsLogin(false);
      }
    };

    checkUserLoginStatus();
  }, []);

const logoutHandler =async ()=>{
  try{
  const response=await axios.post(`${baseUrl}/api/v1/logout`,{},{
      withCredentials:true
    })  

    dispatch({
      type:"USER_LOGOUT"
    })
  }
  catch(err){
    console.log("error in logoutHandler"+err)
  }
    

};

// state.isLogin = true;
  return (
    <div>
      {/* adimn routes */}
      {state.isLogin === true && state.role === "admin" ? (
        <>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Admin Home</Link>
              </li>
              <li>
                <Link to={"/about"}>Admin About</Link>
              </li>
              <li>
                <Link to={"/chat"}>Admin Chat</Link>
              </li>
           <button onClick={logoutHandler}>Admin Logout</button>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null
      }
{/* user routes */}
 {state.isLogin === true && state.role === "user" ? (
        <>
          <nav className="nav-unauth-route-user">
            <ul className="ul-unauth-route-user">
              <li>
                <Link to={"/"} style={{textDecoration:"none", border:"none"}}><p className="unauth-route-name-user">Home</p></Link>
              </li>
              <li>
                <Link to={"/about"} style={{textDecoration:"none"}}><p className="unauth-route-name-user">About</p></Link>
              </li>
              {/* <li>
                <Link className="bg-indigo-500 rounded text-white py-1 px-6 m-2" to={`/profile/${state.user._id}`}>Profile</Link>
              </li> */}
              <li>
                <Link to={"/chat"} style={{textDecoration:"none"}}><p className="unauth-route-name-user">Chat</p></Link>
              </li>
              <button onClick={logoutHandler} className="unauth-logout-button-user">Admin Logout</button>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} />
            {/* <Route path="profile/:userId" element={<Profile />} /> */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null
      }

{/* unauth routes */}
      {state.isLogin === false ? (
        <>
          <nav className="nav-unauth-route">
            <ul className="ul-unauth-route">
              <li>
                <Link to={"/login"} style={{textDecoration:"none", border:"none"}}><p className="unauth-route-name">Login</p></Link>
              </li>
              <li>
                <Link to={"/signup"} style={{textDecoration:"none"}}><p className="unauth-route-name">Signup</p></Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="frontpost" element={<FrontPost />} />
            <Route path="*" element={<Navigate to="/FrontPost" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {/* splash screen */}
       {state.isLogin === null ? (
        <div>
          <img src="./assets/splashScreen.gif"
          className="splash_pic"
          height="100%"
          width="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            zIndex:-1
            
          }}
          alt="splash screen" ></img>
        </div>

       ):null}

   </div>
);
      }
export default App
