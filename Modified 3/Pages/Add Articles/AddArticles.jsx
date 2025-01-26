import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddArticles = () => {
  const axiosPublic = useAxiosPublic();
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const options = [
    { value: "News", label: "News" },
    { value: "Sports", label: "Sports" },
    { value: "Politics", label: "Politics" },
    { value: "International News", label: "International News" },
    { value: "Local News", label: "Local News" },
    { value: "Current Affairs", label: "Current Affairs" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    publisher: "",
    tags: [],
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (selectedTags) => {
    setFormData({
      ...formData,
      tags: selectedTags,
    });
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    try {
      const imgFormData = new FormData();
      imgFormData.append("image", imageFile);

      const response = await axios.post(img_hosting_api, imgFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setFormData({
          ...formData,
          image_url: response.data.data.url,
        });
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.image_url) newErrors.image_url = "Image URL is required";
    if (!formData.publisher) newErrors.publisher = "Publisher is required";
    if (formData.tags.length === 0)
      newErrors.tags = "Please select at least one tag";
    if (!formData.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const articleData = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        description: formData.description,
        publisher: formData.publisher,
        tags: formData.tags.map((tag) => tag.value),
        image_url: formData.image_url,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-article`,
        articleData
      );

      {
        response.data.insertedId &&
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Article added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
      }
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add Articles</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Title */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">
            Image Upload
          </label>
          <input
            type="file"
            name="image_url"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {errors.image_url && (
            <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
          )}
        </div>

        {/* Publisher */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.publisher && (
            <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
          )}
        </div>

        {/* Tags */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <Select
            value={formData.tags}
            onChange={handleTagsChange}
            options={options}
            isMulti
            placeholder="Select tags"
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticles;
