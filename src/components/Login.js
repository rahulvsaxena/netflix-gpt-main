import { useState, useRef } from "react";
import Header from "./Header";
import {checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,getAuth} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import {app} from "../utils/firebase";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    //If the message is not null, dont go ahead
    if (message) return;
    const auth = getAuth(app);
    //check if form is signup or signin
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {displayName: name.current.value,photoURL: USER_AVATAR})
          .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({uid: uid,email: email,displayName: displayName,photoURL: photoURL,}));
            })
            .catch((error) => {setErrorMessage(error.message);});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    
    else{
      // Sign In Logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
        .then((userCredential) => {const user = userCredential.user})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-screen h-screen" src={BG_URL} alt="logo" />
      </div>
      //why e.preventDefault? to stop the webpage from reloading when we click the submit button
      <form onSubmit={(e) => e.preventDefault()} className="md:w-4/12 absolute p-5 bg-black mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}
        
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 w-full bg-gray-700 rounded-lg"
        />
        
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
        </p>
      
      </form>
    </div>
  );
};
export default Login;
