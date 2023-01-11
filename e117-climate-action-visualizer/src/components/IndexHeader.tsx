import { Heading, VStack } from "@chakra-ui/react";
import type { FC } from "react";

interface Props {}

const IndexHeader: FC<Props> = (props) => {
  return (
    <VStack as="header" gap={8}>
      <Heading as="h1" size="4xl" textAlign={"center"}>
        Thousand Trees
      </Heading>
      <Heading
        as="h2"
        size={"lg"}
        textTransform="capitalize"
        textAlign={"center"}
      >
        Revert your Life Time Carbon Footprint to rescue our Planet
      </Heading>
    </VStack>
  );
};

export default IndexHeader;
