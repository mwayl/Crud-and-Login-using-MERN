import React from "react";
// import img1 from "./../../assets/img1.jpg"
// import img2 from "./../../assets/img2.jpeg"
// import { useParams } from "react-router-dom"
import { useState, useRef, useEffect, useContext } from "react";
// import axios from "axios";
// import { baseUrl } from "../../core";
import { GlobalContext } from "../../context/context";
import profilePic from "../../assests/random profile.jpg";
import axios from "axios";
import { baseUrl } from "../../core";


import './adminPanel.css'


function Chat(){
    let { state, dispatch } = useContext(GlobalContext);
    const[studentForm , addStudentForm]=useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [user,setUser] = useState([])

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const courseNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const numberInputRef = useRef(null);
    const [profileImagefileURL, setprofileImageFileURL] =useState(null)
    const [profileImagefile, setprofileImageFile]=useState(null)
    
    // const [showPasswordDiv, dontShowPasswordDiv] = useState("hidden");
    // const [showServerMessageDiv, dontShowServerMessageDiv] = useState("hidden");
    // const [messageFromServer, setMessageFromServer] = useState("");
    useEffect(() => {
      getStudents()
  
      return () => {};
    }, []);

const addStudent =async (e)=>{
    e.preventDefault();
    setSelectedImage(profileImagefileURL)
   addStudentForm(true)
//    alert(firstNameInputRef.current.value +" " +lastNameInputRef.current.value +" " + courseNameInputRef.current.value +" " + emailInputRef.current.value  +" " + passwordInputRef.current.value +" " + numberInputRef.current.value)
//    alert(profileImagefileURL)
//    alert(profileImagefile)

   try {
    const formData = new FormData();
    formData.append("URL", profileImagefileURL);
    formData.append("firstName", firstNameInputRef.current.value);
    formData.append("lastName", lastNameInputRef.current.value);
    formData.append("course", courseNameInputRef.current.value);
    formData.append("email", emailInputRef.current.value);
    formData.append("password", passwordInputRef.current.value);
    formData.append('number', numberInputRef.current.value);

    formData.append("pictureData", profileImagefile);

    const response = await axios.post(`${baseUrl}/api/v1/addStudent`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);

    // getCoverPhoto();
  } catch (err) {
    console.log(err);
  }




    }

const sendProfilePicture=()=>{
    alert("hello")
}

const getStudents=async ()=>{
  try {
    // isLoading(true);
    const response = await axios.get(`${baseUrl}/api/v1/students`, {
      withCredentials: true,
    });

    // isLoading(false);
    console.log(response.data);
    // getProfilePicture();
    setUser(response.data);
   
    //   console.log(allPosts)
  } catch (error) {
    console.log(error.data);
    // isLoading(false);
  }
}














    // console.log("state: ", state);
    return (
<div className="main-div">
    <div className="right-side">
        <h2 className="logo-heading">Logo</h2>
        <ul className="list-right-side">
            <li>Stdents</li><br />
            <li>Attendence</li>
        </ul>
    </div>
    <div className="left-side">
        <div className="heading-div">
            <div className="pic-logo"></div>
           <h1 className="main-heading">Students</h1>
     </div>
     <button className="add-student-button" onClick={()=>{
        addStudentForm(true)
     }}>Add Student</button>

     {studentForm && (
            <div className="overlay">
              <div className="addStudentDiv" >
           
                
                <form className="Form-div-addstudent" onSubmit={addStudent} >
                <div className="add-backbutton">
                    <label style={{color:"red"}} onClick={()=>{
                    addStudentForm(false)
                        // alert("hello")
                    }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
</label>
                    <span className="heading-student">Add Student</span>
                    <button type="submit" className="add">Add</button>
                     
                  </div>

                  <div className="profile-pic">
            <label
              for="select_image"
              id="select_imag"
              style={{ color: "black" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
              </svg>
            </label>
            {/* ( if(getImage === "" && selectedImage !== "" || selectedImage === "" && getImage === ""){
                  <img src={profilePic} id="dynamicPic" style={{width: '30vh' ,height: '31vh'}}></img>
                 }

                 ) */}

            {/* 
                  { getImage === "" && selectedImage !== "" ?
                   <img src={profilePic} id="dynamicPic" style={{width: '30vh' ,height: '31vh',display:'none'}}></img>
                   :<img src={profilePic} id="dynamicPic" style={{width: '30vh' ,height: '31vh'}}></img>}  
                 
                 {getImage && 
                   (<img src={getImage} alt="not found" id="dynamicPic" style={{width: '30vh' ,height: '31vh'}}></img>)
                 
                   } */}

            {selectedImage === "" ? (
              <img
                src={profilePic}
                id="dynamicPic"
                style={{ width: "20vh", height: "20vh", borderRadius: "110px" }}
              ></img>
            ) : (
              <img
                src={profilePic}
                id="dynamicPic"
                style={{
                  width: "20vh",
                  height: "20vh",
                  borderRadius: "110px",
                  display: "none",
                }}
              ></img>
            )}

            {selectedImage && (
              <img
                src={selectedImage}
                alt="not found"
                id="dynamicPic"
                style={{ width: "20vh", borderRadius: "110px", height: "20vh" }}
              ></img>
            )}

            <input
              type="file"
              id="select_image"
              name="image"
              style={{ display: "none" }}
              accept="image/*"
             
              onChange={(event) => {
                console.log("image is : " + event.target.files[0].name);
                // setSelectedImage=URL.createObjectURL(event.target.files[0]);
                const base64URL = URL.createObjectURL(event.target.files[0]);
                setprofileImageFileURL(base64URL)
                setprofileImageFile(event.target.files[0])
                
                // sendProfilePicture(
                //   base64URL,
                //   state.user.email,
                //   event.target.files[0]
                // );
              }}

            />

            </div>






                 <div className="input-fields">
                  <label for="firstName">First Name
                  <br />
                  <input
                    type="text"                    // autoComplete="current-password"
                    className="firstName"
                    name="firstName"
                    placeholder="First Name"
                    ref={firstNameInputRef}
                  ></input>
                  </label>
             
                  <label for="lastName">Last Name
                  <br />
                  <input
                    type="text"
                    // autoComplete="current-password"
                    className="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    ref={lastNameInputRef}
                  ></input>
                  </label>
                  <br />
                  <label for="course">Course
                  <br />
                  <input
                    type="text"
                    // autoComplete="current-password"
                    className="course"
                    name="course"
                    placeholder="Course"
                    ref={courseNameInputRef}
                  ></input>
                  </label>
                  <label for="password">Password    
                  <br />
                  <input
                    type="password"
                    // autoComplete="current-password"
                    className="passwordField"
                    name="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                  ></input>
                  </label>
                  <br />
                  <label for="email">Email
                  <br />
                  <input
                    type="email"
                    // autoComplete="current-password"
                    className="emailField"
                    name="email"
                    placeholder="Email"
                    ref={emailInputRef}
                  ></input>
                 </label>
                  <label for="phoneNumber">Phone Number
                  <br />
                  <input
                    type="number"
                    // autoComplete="current-password"
                    className="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    ref={numberInputRef}
                  ></input>
                  </label>
                  <br />
                  </div>
                  {/* <p class="sign-in">Already have an account? <b><a href="index.html">Sign Up</a></b></p>  */}
                </form>
              </div>
            </div>

          )}

          <div className="student">
            <div className="value-div">
              <ul className="heading-value">
                <li>id</li>
                <li>Profile img</li>
                <li>Name</li>
                <li>Course Name</li>
                <li>Password</li>
              </ul>
            </div>
          </div>
     </div>

</div>
    )

}
export default Chat;