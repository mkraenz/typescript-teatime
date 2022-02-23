import { Box } from "@chakra-ui/react";
// todo reconsider /src path
import { useGetTeasQuery } from "../../src/generated/graphql";
import Navbar from "../common/Navbar";
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

  return (
    <>
      <Navbar />
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
    </>
  );
};
