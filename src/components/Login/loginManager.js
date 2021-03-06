import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config' ;


export const initializeLoginFramework=() => {

  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig)
  }
  
};

// *******START// GOOGLE HANDLE*********************
export const handleGoogleSignIn=()=>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
  .then(res=>{
    const {displayName, photoURL , email}=res.user
    const signedInUser={
      isSignedIn:true,
      name:displayName,
      email:email,     
      photo:photoURL,
      success:true
    }

    return signedInUser
    // console.log(displayName, photoURL , email);
    // console.log(res);
  })
  .catch(err=>{
    console.log(err.error)
    console.log(err.Message)
  })

}
// *******END// GOOGLE HANDLE*********************

// ****START// FACEBOOK HANDLE*************************

// export const handleFbSignIn=()=>{
//   const fbProvider = new firebase.auth.FacebookAuthProvider();
//  return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
        // user.success=true
//         return user;
//     
//   }).catch(function(error) {
   
//     var errorCode = error.code;
//     var errorMessage = error.message;

    
//     console.log(errorCode, errorMessage )
//   });
// }
// ****END// FACEBOOK HANDLE*************************

// START**// SIGN OUT***************
export const handleSignOut=()=>{
  return firebase.auth().signOut()
  .then(res=>{
    
    const signedOutUser={
      isSignedIn:false,
      name:"",
      email:"",      
      photo:"",
      error:"",
      success:false
    }

    return signedOutUser
  })
  .catch(err=>{

  })

}
// END**// SIGN OUT***************


// ********START //USER CREATION**************************
export const createUserWithEmailAndPassword =(name,email,password)=> {
  return firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(res=>{
        console.log( res)
        const newUserInfo=res.user
        // newUserInfo.error=<h1 style={{color:"gray"}}>Your Id has created</h1>  *****self try code ****
        newUserInfo.error="";
        newUserInfo.success=true
          
        updateUserName(name)
        verifyEmail()
        return newUserInfo
        // console.log( res)
      })
      
      .catch(error=> {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;

        const newUserInfo={}       
        newUserInfo.error=error.message
        newUserInfo.success=false
        return newUserInfo
        // setUser.error=errorMessage
        // setUser({...user})
        
        // console.log( errorCode, errorMessage)
      });

}

// ********END //USER CREATION**************************


// START//SIGN IN *****************
export const signInWithEmailAndPassword=(email, password)=>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res=>{
    const newUserInfo=res.user
    // newUserInfo.error=<h1 style={{color:"gray"}}>Your Id has created</h1>  *****self try code ****
    newUserInfo.error="";
    newUserInfo.success=true
    
    return newUserInfo

   
  })
  .catch(error=> {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    const newUserInfo={}       
    newUserInfo.error=error.message
    newUserInfo.success=false
    



  });

}
// END//SIGN IN *****************


// *******START//UPDATE USER NAME**********
 const updateUserName=name=>{
  const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
  
}).then(function() {
  console.log( "user Info Updated Succesfully")
}).catch(function(error) {
  console.log(error);
});
}
// *******END//UPDATE USER NAME**********
const verifyEmail=()=>{
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
  // Email sent.
  }).catch(function(error) {
  // An error happened.
});
}
export const resetPassword=email=>{
const auth = firebase.auth();


auth.sendPasswordResetEmail(email).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}