import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../../assets/login.json";
import AuthContext from "../../Context/Auth Context/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin";

const Login = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    setErrorMessage("");
    login(data.email, data.password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage("Incorrect credentials. Please try again.");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
          <button>
            <Link>
              <SocialLogin></SocialLogin>
            </Link>
          </button>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-5">Login now!</h1>
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Login;
