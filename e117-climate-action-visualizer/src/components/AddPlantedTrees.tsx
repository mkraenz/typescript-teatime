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
import { useState } from "react";

interface Props {}

export const STORAGE_KEY = "tstt:plantedTrees";

const AddPlantedTrees: FC<Props> = (props) => {
  const [value, setValue] = useState(1);
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    min: 1,
    max: 100000,
    precision: 0,
    value,
    onChange(valueAsString, valueAsNumber) {
      setValue(valueAsNumber);
    },
  });
  const plantTrees = () => {
    // TODO hitting backspace causes the UI to show NaN (but it still has value 1)
    const prevPlantedTrees = Number.parseInt(
      localStorage.getItem(STORAGE_KEY) || "0",
      10
    );
    const newPlantedTrees = prevPlantedTrees + valueAsNumber;
    localStorage.setItem(STORAGE_KEY, newPlantedTrees.toString());
    setValue(1);
  };

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
          <Button pl={10} pr={10} minW={32} maxW={32} onClick={plantTrees}>
            Add
          </Button>
        </WrapItem>
      </Wrap>
    </VStack>
  );
};

export default AddPlantedTrees;
