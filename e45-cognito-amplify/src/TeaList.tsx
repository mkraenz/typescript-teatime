import React from "react";
import { useGetTeasQuery } from "./generated/graphql";

const TeaList = () => {
  const { loading, error, data } = useGetTeasQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="teas">
      <h1>Tea List</h1>
      <ul>
        {data?.teas.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.name}</h2>
            <p>{node.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeaList;
