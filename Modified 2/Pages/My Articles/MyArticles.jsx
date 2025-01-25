import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: articles,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myArticles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-articles?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError)
    return <p className="text-center text-red-500">Failed to get articles.</p>;

  const handleDelete = async (Id) => {
    try {
      await axiosSecure.delete(`/delete-article/${Id}`);
      refetch();
      toast.success("deleted success");
    } catch (err) {
      alert("Error deleting article");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Articles</h2>

      {articles?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-gray-300 shadow-lg">
            {/* Table Head */}
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">total</th>
                <th className="p-3 text-left">Article Title</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Premium</th>
                <th className="p-3 text-left">Update</th>
                <th className="p-3 text-left">Delete</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id} className="hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold">{article.title}</td>
                  <td className="p-3">
                    <Link to={`/article-details/${article._id}`}>
                      <button className="btn btn-sm btn-info text-white">
                        View Details
                      </button>
                    </Link>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        article.status === "approved"
                          ? "bg-green-500 text-slate-900"
                          : "bg-yellow-500 text-red-700"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {article.isPremium ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button className="btn btn-sm btn-warning text-white">
                      <GrUpdate />
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(article._id)}
                    >
                      <FaDeleteLeft />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          {user.displayName} You do not have any Article
        </p>
      )}
    </div>
  );
};

export default MyArticles;
