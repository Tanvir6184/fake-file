// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

// const MyProfile = () => {
//   const { user } = useAuth(); // Get the logged-in user
//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();

//   // Fetch user profile data
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["profile", user._id],
//     queryFn: async () => {
//       const response = await axiosPublic.get(`/my-profile/${user._id}`);
//       return response.data;
//     },
//   });

//   // Mutation to update user profile
//   const updateProfile = useMutation({
//     mutationFn: async (updatedData) => {
//       return await axiosPublic.patch(`/my-profile/${user._id}`, updatedData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["profile"]); // Refetch the profile data
//     },
//   });

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;

//     // Send updated data to the backend
//     updateProfile.mutate({ name, email });
//   };

//   // Render loading and error states
//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }
//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="card bg-base-100 w-1/2 shrink-0 shadow-2xl">
//       <form onSubmit={handleUpdate} className="card-body">
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Name</span>
//           </label>
//           <input
//             name="name"
//             type="text"
//             defaultValue={data.name}
//             placeholder="Name"
//             className="input input-bordered"
//             required
//           />
//         </div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Email</span>
//           </label>
//           <input
//             name="email"
//             type="email"
//             defaultValue={data.email}
//             placeholder="Email"
//             className="input input-bordered"
//             required
//           />
//         </div>
//         <div className="form-control mt-6">
//           <button className="btn bg-gray-600">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyProfile;
import React from "react";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  console.log("Logged-in User:", user);

  return (
    <div className="profile-container">
      <h1>My Profile </h1>
    </div>
  );
};

export default MyProfile;
