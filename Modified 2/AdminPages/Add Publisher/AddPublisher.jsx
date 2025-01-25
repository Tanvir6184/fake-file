import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddPublisher = () => {
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
  const axiosPublic = useAxiosPublic();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosPublic.post(img_hosting_api, formData);
      if (response.data.success) {
        return response.data.data.url;
      } else {
        alert("Image upload failed");
        return null;
      }
    } catch (err) {
      alert("Something went wrong while uploading the image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.publisherName.value;
    const file = e.target.publisherLogo.files[0];

    const logoUrl = await handleImageUpload(file);

    if (logoUrl) {
      const publisherData = {
        name: name,
        logo: logoUrl,
      };

      try {
        const response = await axiosPublic.post(
          "/add-publishers",
          publisherData
        );
        if (response.data.success) {
          alert("Publisher added successfully!");
        } else {
          alert("Failed to add publisher");
        }
      } catch (err) {
        alert("Error submitting publisher");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Publisher
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="publisherName"
              className="block text-sm font-medium text-gray-700"
            >
              Publisher Name
            </label>
            <input
              type="text"
              name="publisherName"
              id="publisherName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter Publisher Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="publisherLogo"
              className="block text-sm font-medium text-gray-700"
            >
              Publisher Logo
            </label>
            <input
              type="file"
              name="publisherLogo"
              id="publisherLogo"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
