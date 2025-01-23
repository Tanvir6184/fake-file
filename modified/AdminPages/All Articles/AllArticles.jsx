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
  console.log(articles);
  const handleApproval = async (articleId) => {
    try {
      await axiosSecure.put(`/articles/status/${articleId}`, {
        status: "approved",
      }); // Send the status in the body
      toast.success("Article approved"); // Use toast for better UX
      refetch(); // Refresh the articles to show the updated status
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
      // alert("Article deleted");
    } catch (err) {
      alert("Error deleting article");
    }
  };

  const handleMakePremium = async (articleId) => {
    try {
      await axios.put(`/make-premium/${articleId}`);
      alert("Article marked as premium");
    } catch (err) {
      alert("Error marking article as premium");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="card w-full bg-slate-400 shadow-xl rounded-lg overflow-hidden p-4"
          >
            <figure className="mb-4">
              <img
                src={article.image_url || "https://via.placeholder.com/400"}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </figure>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {article.title}
              </h2>
              <p className="text-gray-200 mb-4">{article.description}</p>
              <p className="text-gray-300">Author: {article.name}</p>
              <p className="text-gray-300">Email: {article.email}</p>
              <p className="text-gray-300">
                Published on:{" "}
                {new Date(article.posted_date).toLocaleDateString()}
              </p>
              <p className="text-gray-300">Publisher: {article.publisher}</p>
              <div className="flex justify-center space-x-2">
                {article.status === "pending" ? (
                  <button
                    className="btn-sm bg-yellow-500 rounded-lg"
                    onClick={() => handleApproval(article._id)}
                  >
                    Pending
                  </button>
                ) : (
                  <button className="btn-sm bg-green-600 rounded-lg" disabled>
                    Approved
                  </button>
                )}
                <button
                  className="btn-sm bg-yellow-600 rounded-lg"
                  onClick={() => openDeclineModal(article._id)}
                >
                  Decline
                </button>
                <button
                  className="btn-sm bg-red-600 rounded-lg"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
                <button
                  className="btn-sm bg-purple-700 rounded-lg"
                  onClick={() => handleMakePremium(article._id)}
                >
                  Premium
                </button>
              </div>
              {article.declineReason && (
                <p className="text-red-500 text-sm mt-2">
                  Decline Reason: {article.declineReason}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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
