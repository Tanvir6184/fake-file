import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [currentArticleId, setCurrentArticleId] = useState(null);

  const {
    data: articles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  const handleApproval = async (articleId) => {
    try {
      await axiosSecure.put(`/articles/status/${articleId}`, {
        status: "approved",
      });
      toast.success("Article approved");
      refetch();
    } catch (err) {
      console.error("Error approving article:", err);
      toast.error("Error approving article");
    }
  };

  const openDeclineModal = (articleId) => {
    setCurrentArticleId(articleId);
    setIsModalOpen(true);
  };

  const handleDecline = async () => {
    try {
      await axios.put(`/decline-article/${currentArticleId}`, {
        reason: declineReason,
      });
      alert("Article declined");
      setIsModalOpen(false);
    } catch (err) {
      alert("Error declining article");
    }
  };

  const handleDelete = async (articleId) => {
    try {
      await axiosSecure.delete(`/delete-article/${articleId}`);
      refetch();
      toast.success("deleted success");
    } catch (err) {
      toast.error("Error deleting article");
    }
  };

  const handleMakePremium = async (articleId) => {
    try {
      await axios.put(`http://localhost:5000/make-premium/${articleId}`);
      refetch();
      toast.success("Article marked as premium!");
    } catch (err) {
      toast.error("Error marking article as premium.");
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <figure className="relative">
            <img
              src={article.image_url || "https://via.placeholder.com/400"}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            {article.isPremium && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Premium
              </span>
            )}
          </figure>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{article.description}</p>
            <div className="flex flex-col text-sm text-gray-500">
              <p>
                <span className="font-semibold">Author:</span> {article.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {article.email}
              </p>
              <p>
                <span className="font-semibold">Published:</span>{" "}
                {new Date(article.posted_date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {article.publisher}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {article.status === "pending" ? (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
                  onClick={() => handleApproval(article._id)}
                >
                  Approve
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md cursor-not-allowed"
                  disabled
                >
                  Approved
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                onClick={() => handleDelete(article._id)}
              >
                Delete
              </button>
              <button
                className={`px-4 py-2 rounded-lg shadow-md transition ${
                  article.isPremium
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-purple-700 hover:bg-purple-800"
                } text-white`}
                onClick={() => handleMakePremium(article._id)}
              >
                {article.isPremium ? "Premium" : "Make Premium"}
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
                onClick={() => openDeclineModal(article._id)}
              >
                Decline
              </button>
            </div>
            {article.declineReason && (
              <p className="mt-3 text-red-500 text-sm font-medium">
                Decline Reason: {article.declineReason}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Decline Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg h-80 w-80">
            <h3 className="text-lg font-semibold mb-4">Decline Article</h3>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="7"
              placeholder="Enter reason for decline..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
