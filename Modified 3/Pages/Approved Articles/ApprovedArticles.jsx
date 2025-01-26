import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ApprovedArticles = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approvedArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles-approved?status=approved");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Approved Articles</h2>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedArticles;
