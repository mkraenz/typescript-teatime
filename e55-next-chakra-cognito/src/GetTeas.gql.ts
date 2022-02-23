import { gql } from "@apollo/client";

export const TEAS = gql`
  query GetTeas ($filter: TeaFilter) {
    teas(filter: $filter) {
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
