import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../components/common/Navbar";
import { ProductCard } from "../components/index/ProductCard";
import { ProductGrid } from "../components/index/ProductGrid";
import { useGetTeasQuery } from "../src/generated/graphql";

const SearchResults: NextPage = () => {
  // get query param ?keyword=
  const router = useRouter();
  const keyword = router.query.keyword;
  // TODO: is this against the rules of hooks?
  if (typeof keyword !== "string" || keyword === "") {
    router.push("/");
  }
  const { loading, data, error } = useGetTeasQuery({
    variables: {
      filter: {
        or: [
          { tags: { like: `%${keyword}%` } },
          { name: { like: `%${keyword}%` } },
        ],
      },
    },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <>
      {/* TODO can we get rid of the type assertion */}
      <Navbar keyword={keyword as string} />
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        {data.teas.totalCount === 0 ? (
          <div>No results found &apos;{keyword}&apos;</div>
        ) : (
          <ProductGrid>
            {data.teas.edges.map(({ node }) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </ProductGrid>
        )}
      </Box>
    </>
  );
};

export default SearchResults;
