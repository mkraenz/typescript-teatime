import { gql, useQuery } from "@apollo/client";
import React from "react";

const TEAS = gql`
  query GetOrders {
    orders {
      totalCount
      edges {
        node {
          id
          userId
          status
          items {
            id
            productId
            unitPrice
            quantity
          }
        }
      }
    }
  }
`;

const OrdersList = () => {
  // TODO add apollo codegen or graphql-codegen
  const { loading, error, data } = useQuery<
    {
      orders: {
        totalCount: number;
        edges: {
          node: {
            id: string;
            userId: string;
            status: string;
            items: {
              id: string;
              productId: string;
              unitPrice: number;
              quantity: number;
            }[];
          };
        }[];
      };
    },
    never
  >(TEAS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <ul>
        {data?.orders.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.status}</h2>
            <ul>
              {node.items.map(({ id, productId, unitPrice, quantity }) => (
                <li>
                  {productId} {unitPrice} {quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
