import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ProfileUpdate = () => {
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const { user, updateProfile } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(img_hosting_api, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");

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
        title: "Error",
        text: error.message,
      });
      return null;
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      setMessage("No user is logged in.");
      return;
    }

    setIsLoading(true);
    let imageUrl = user?.photoURL || "";

    if (photoFile) {
      imageUrl = await uploadImage(photoFile);
      if (!imageUrl) {
        setMessage("Failed to upload the image.");
        setIsLoading(false);
        return;
      }
    }

    try {
      await updateProfile({
        displayName: displayName || user.displayName,
        photoURL: imageUrl,
      });
      console.log(photoURL);

      setMessage("Profile updated successfully!");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Profile
        </h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-blue-400 shadow-md"
          />
        </div>

        <div className="border-2 text-center text-2xl text-purple-600 font-bold mb-4">
          <h2>{user?.displayName || "No Name"}</h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            New Display Name
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter new display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            New Profile Photo
          </label>
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
