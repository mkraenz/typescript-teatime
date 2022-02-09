import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";

interface Props {}

const NavLink: FC = ({ children }) => (
  <ChakraLink
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </ChakraLink>
);

const Links = ["Dashboard", "Projects", "Team"];

const Searchbar: FC = () => {
  return (
    <InputGroup>
      <Input
        bg={useColorModeValue("white.100", "white.500")}
        borderWidth="medium"
      />
      <InputRightAddon px={0}>
        <IconButton
          icon={<Icon as={FiSearch} />}
          aria-label="Search"
          bg={"brand.300"}
        />
      </InputRightAddon>
    </InputGroup>
  );
};

const Navbar: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4}>
      <VStack display={{ md: "none" }} w="100%" py={2}>
        <HStack justifyContent={"space-between"}>
          <HStack>
            <IconButton
              icon={
                isOpen ? (
                  <Icon as={FiX} boxSize="1.5em" />
                ) : (
                  <Icon as={FiMenu} boxSize="1.5em" />
                )
              }
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
              bg={"brand.300"}
            />
            <Box>Logo</Box>
          </HStack>
          <HStack>
            <Link href="/signin" passHref>
              <Button bg={"brand.300"}>Sign In</Button>
            </Link>
            <IconButton
              bg={"brand.300"}
              aria-label={"Go to Shopping cart"}
              icon={
                <Icon
                  boxSize="1.5em"
                  as={FiShoppingBag}
                  aria-label={"Shopping cart"}
                />
              }
            ></IconButton>
          </HStack>
        </HStack>
        <Searchbar />
      </VStack>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}

      <HStack
        spacing={3}
        py={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        display={{ base: "none", md: "flex" }}
      >
        <Box px={1}>Logo</Box>
        <HStack w="100%">
          <Searchbar />
        </HStack>
        <Link href="/signin" passHref>
          <Button bg={"brand.300"}>Sign In</Button>
        </Link>
        <Button bg={"brand.300"}>Orders</Button>
        <IconButton
          bg={"brand.300"}
          aria-label={"Go to Shopping cart"}
          icon={
            <Icon
              boxSize="1.5em"
              as={FiShoppingBag}
              aria-label={"Shopping cart"}
            />
          }
        ></IconButton>
      </HStack>
    </Box>
  );
};

export default Navbar;
