import React, { useContext } from "react";
import AuthContext from "../Context/Auth Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          image: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Google Sign In Successful");
          navigate("/");
        });
        // toast.success("Google Sign In Successful");
        // navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <p className="mx-auto flex justify-center items-center p-2">
        <button onClick={handleGoogleSignIn} className="btn">
          Sign in with <FcGoogle className="ml-2"></FcGoogle>
        </button>
      </p>
    </div>
  );
};

export default SocialLogin;
