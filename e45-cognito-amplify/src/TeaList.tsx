import { gql, useQuery } from "@apollo/client";
import React from "react";

const TEAS = gql`
  query GetTeas {
    teas {
      totalCount
      edges {
        node {
          id
          name
          bestAtTemperature
          tags
          price
        }
      }
    }
  }
`;

const TeaList = () => {
  // TODO add apollo codegen or graphql-codegen
  const { loading, error, data } = useQuery<
    {
      teas: {
        totalCount: number;
        edges: {
          node: {
            id: string;
            name: string;
            bestAtTemperature: number;
            tags: string;
            price: number;
          };
        }[];
      };
    },
    never
  >(TEAS);
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
