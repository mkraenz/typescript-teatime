import { chakra, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { range } from "../utils/mymath";
import { STORAGE_KEY } from "./AddPlantedTrees";
const Icon = chakra(FontAwesomeIcon);

interface Props {}

const Tree: FC<{}> = ({}) => {
  return (
    <WrapItem>
      <Icon icon={faTree} boxSize={10} color="brand.300" />
    </WrapItem>
  );
};

const Forest: FC<Props> = (props) => {
  const [trees, setTrees] = useState(0);
  useEffect(() => {
    const plantedTrees = Number.parseInt(
      localStorage.getItem(STORAGE_KEY) ?? "0",
      10
    );
    setTrees(plantedTrees);
  }, []);

  if (trees === 0) {
    return <Text>Plant trees and your forest will show up here.</Text>;
  }
  //   return <Text>Hi</Text>
  return (
    <Wrap>
      {range(trees).map((i) => (
        <Tree key={i} />
      ))}
    </Wrap>
  );
};

export default Forest;
