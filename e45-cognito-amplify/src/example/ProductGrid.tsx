import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import * as React from "react";

export const ProductGrid = (props: SimpleGridProps) => {
  const columns = {
    base: 1,
    sm: 2,
    lg: 3,
  };

  return (
    <SimpleGrid
      columns={columns}
      columnGap={{ base: "4", md: "6" }}
      rowGap={{ base: "8", md: "10" }}
      {...props}
    />
  );
};
