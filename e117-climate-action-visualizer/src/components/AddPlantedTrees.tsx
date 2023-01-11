import {
  Button,
  Heading,
  HStack,
  Input,
  useNumberInput,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { FC } from "react";

interface Props {}

const AddPlantedTrees: FC<Props> = (props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: 100000,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <VStack minW={"full"}>
      <Heading as="h3" size="md" textAlign={"center"}>
        Add trees to your forest
      </Heading>
      <Wrap gap={8} align="center" justify={"center"}>
        <WrapItem>
          <HStack maxW="sm">
            <Button {...dec}>-</Button>
            <Input
              {...input}
              _focusVisible={{ borderColor: "brand.500" }}
              size={"lg"}
              maxW={32}
              mr={4}
            />
            <Button {...inc}>+</Button>
          </HStack>
        </WrapItem>
        <WrapItem>
          <Button pl={10} pr={10} minW={32} maxW={32}>
            Add
          </Button>
        </WrapItem>
      </Wrap>
    </VStack>
  );
};

export default AddPlantedTrees;
