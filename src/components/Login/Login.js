import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './loginManager';



function Login() {
  const [newuser, setNewuser]=useState(false)
  const [user, setUser]=useState({
      isSignedIn:false,     
      name:"",
      email:"",
      password:"",
      photo:"",
      error:'',
      success:false

  })
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] =useContext(UserContext)
  const history=useHistory()
  const location= useLocation()
  const { from } = location.state || { from: { pathname: "/" } };

  //START GOOGLE SIGN IN****************
  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res=>{
        handleResponse(res, true)
        // setUser(res)
        // setLoggedInUser(res)
        // history.replace(from);

      })
  }
  //END GOOGLE SIGN IN****************


  //START FaceBook SIGN IN****************
  // const fbSignIn=()=>{
  //   handleFbSignIn()
  //   .then(res=>{
    // handleResponse(res, true)
    // do not need bellow 3 line if handle response is active
  //     setUser(res);
  //     setLoggedInUser(res);
  //     history.replace(from);
  //   })
  // }
  //END FaceBook SIGN IN****************

//START  SIGN OUT ****************
  const signOut=()=>{
      handleSignOut()
      .then(res=>{
        handleResponse(res, false)
        // setUser(res)
        // setLoggedInUser(res)
      })
  }
 //END  SIGN OUT **************** 


  

// module 42.2 function****************************
const handleSubmit=(e) => {
   
    if(newuser && user.email && user.password ){
      // console.log(user.password, user.name , user.email)
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res=>{
        handleResponse(res, true)
        // setUser(res)
        // setLoggedInUser(res)
        // history.replace(from);

      })
    }

    if(!newuser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        handleResponse(res, true)
        // setUser(res)
        // setLoggedInUser(res)
        // history.replace(from);
      })
    }
    e.preventDefault() 
 }

 const handleResponse=(res, redirect)=>{
  setUser(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
  
 }


 const  handleBlur=(e)=>{
  // debugger;
  let isFieldValid=true;
  if(e.target.name==="email"){
    isFieldValid=/\S+@\S+\.\S+/.test(e.target.value)
    
  }
  if(e.target.name==="password"){
      const isPasswordValid=e.target.value.length>6
      const isPasswordContain=/\d{1}/.test(e.target.value)

      isFieldValid=isPasswordValid && isPasswordContain
  }
  if(isFieldValid){

    const newUserInfo={...user}
    // console.log( user)
    console.log( newUserInfo)
    newUserInfo[e.target.name]=e.target.value
// console.log( "Everything going Okay")
    setUser(newUserInfo)

  }
  
 }
 const handleResetting=()=>{
   resetPassword(user.email)
 }

 

  return (
    <div style={{textAlign: 'center'}}>
    {
      user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      
      }
      <br/>
      {/* *******FACE BOOK SIGN IN BUTTIN ******** */}
      {/* <button onClick={fbSignIn}>Sign In usingFacebook</button> */}
     
     {
       user.isSignedIn && <div>
        <p>Welcome {user.name}</p> 
        <p>Your email : {user.email}</p>
        <img src={user.photo} alt="" width="100"/>
        </div>
     }

{/* MODULE 42.2******************* */}

     <h1>Our Own Authentication</h1>
     
         <input type="checkbox" onChange={()=>setNewuser(!newuser)} name="newUser" id=""/> 
         <label htmlFor="newUser">New user SiGn Up</label>
        <form onSubmit={handleSubmit}>
        {newuser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}<br/>
        <input onBlur={handleBlur} name="email" type="text" placeholder="Enter your email" required/> <br/>
        <input  onBlur={handleBlur}  name="password" type="password" id="" placeholder="Enter your password" required/>
        <br/>
        <button type="submit" value="Submit">{newuser ? "Sign Up" : "Sign In"}</button>
        </form>
        <button onClick={handleResetting}>Forget & Reset Password</button>

        {/* self try code*********** */}
        {/* {
          user.success ? <h3 style={{color:"blue"}}>Account Created</h3> : <h3 style={{color:"red"}}>{user.error}</h3>
        } */}
        <h3 style={{color:"red"}}>{user.error}</h3>
        {
          user.success && <h3 style={{color:"blue"}}>{newuser ? "Account Created" : "Logged In"}</h3>
        }
    </div>
  );
}

export default Login;
