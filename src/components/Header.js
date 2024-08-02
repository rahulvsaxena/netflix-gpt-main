import { onAuthStateChanged,signOut,getAuth} from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {LOGO} from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({uid: uid,email: email,displayName: displayName,photoURL: photoURL,}));
        navigate("/browse");
      }
      else{
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);


  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
      <div className="flex items-center p-2 justify-between">
  <img className="w-10 h-10 rounded-lg" alt="usericon" src={user?.photoURL} />
  <button onClick={handleSignOut} className="flex items-center font-bold text-white">
    <LuLogOut className="w-8 h-8" />
  </button>
</div>

      )}
    </div>
  );
};
export default Header;
