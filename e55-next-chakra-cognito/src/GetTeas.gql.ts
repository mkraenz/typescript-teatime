import { gql } from "@apollo/client";

export const TEAS = gql`
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
          currency
          imageUrl
          rating
          ratingCount
          description
        }
      }
    }
  }
`;
