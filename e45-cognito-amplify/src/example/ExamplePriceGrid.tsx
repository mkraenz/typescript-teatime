import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useGetTeasQuery } from "../generated/graphql";
import { ProductCard } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";

export const ExamplePriceGrid = () => {
  const { loading, data, error } = useGetTeasQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>ERROR</div>;
  }

  console.log(data);
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <ProductGrid>
        {data.teas.edges.map(({ node }) => (
          <ProductCard key={node.id} product={node} />
        ))}
      </ProductGrid>
    </Box>
  );
};
