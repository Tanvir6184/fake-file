import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${id}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="mb-4 rounded-md"
      />
      <p className="text-gray-700">{article.content}</p>
      <p className="mt-4 text-sm text-gray-500">Published on: {article.date}</p>
    </div>
  );
};

export default ArticleDetails;
