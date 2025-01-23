import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";

const Publisher = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: publishers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  if (error) return <div>Error fetching publishers: {error.message}</div>;

  return (
    <div className="">
      <h2 className="text-center">Our Proud Publisher</h2>
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {publishers.map((publisher) => (
          <li
            key={publisher._id}
            className="flex justify-center items-center flex-col"
          >
            <img src={publisher.logo} alt={publisher.name} width="100" />
            <h3>{publisher.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Publisher;
