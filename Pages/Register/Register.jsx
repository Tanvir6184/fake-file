import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import animation from "../../assets/register.json";
import { useContext } from "react";
import AuthContext from "../../Context/Auth Context/AuthContext";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, ProfileUpdate } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(img_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Error uploading image",
        text: error.message,
      });
    }
  };

  const onSubmit = async (data) => {
    console.log(data);

    const imageUrl = await uploadImage(data.image[0]);

    if (imageUrl) {
      createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        ProfileUpdate(data.name, imageUrl)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              image: imageUrl,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("user added");
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User created successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Daily BD | Register</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* Form Section */}
        <div>
          <p className="text-center text-3xl font-bold">REGISTER HERE!</p>
          <form
            className="card-body bg-white p-6 shadow-lg rounded-md w-full max-w-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button className="btn bg-sky-400 w-full" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center pt-2 ">
            Have an account?{" "}
            <span className="text-green-400 font-bold">
              <Link to="/login">login</Link>
            </span>
          </p>
        </div>

        {/* Lottie Animation Section */}
        <div className="w-1/2 p-2 hidden md:block">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;
