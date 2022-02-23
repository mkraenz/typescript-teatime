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
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";

interface Props {
  keyword?: string;
}

type Amount = number;
type Cart = { [productId: string]: Amount };

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

const Searchbar: FC<{ keyword?: string }> = ({ keyword }) => {
  const [value, setValued] = useState(keyword || "");
  const router = useRouter();
  const search = () => {
    router.push(`/search?keyword=${value}`);
  };
  return (
    <InputGroup>
      <Input
        bg={useColorModeValue("white.100", "white.500")}
        borderWidth="medium"
        value={value}
        onChange={(e) => setValued(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") search();
        }}
      />
      <InputRightAddon px={0}>
        <IconButton
          icon={<Icon as={FiSearch} />}
          aria-label="Search"
          bg={"brand.300"}
          onClick={search}
        />
      </InputRightAddon>
    </InputGroup>
  );
};

const ShoppingBag = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const localStorageCart: Cart = JSON.parse(
      window.localStorage.getItem("cart") || "{}"
    );
    const newCount = Object.keys(localStorageCart).length || count;
    setCount(newCount);
  }, [count, setCount]);

  const gotoCart = () => router.push("/cart");

  return (
    <IconButton
      onClick={gotoCart}
      bg={"brand.300"}
      aria-label={"Go to Shopping cart"}
      icon={
        <>
          <Icon
            boxSize="1.5em"
            as={FiShoppingBag}
            aria-label={"Shopping cart"}
          />
          {Boolean(count) && (
            <Box
              as={"span"}
              position={"absolute"}
              left={"6px"}
              top={"4px"}
              fontSize={"0.8rem"}
              bgColor={"red.400"}
              borderRadius={"1000"}
              zIndex={9999}
              px={"4px"}
            >
              {count}
            </Box>
          )}
        </>
      }
    />
  );
};

const Logo = () => {
  const router = useRouter();
  const gotoHome = () => router.push("/");
  return <Box onClick={gotoHome}>Logo</Box>;
};

const Navbar: FC<Props> = ({ keyword }) => {
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
            <Logo />
          </HStack>
          <HStack>
            <Link href="/signin" passHref>
              <Button bg={"brand.300"}>Sign In</Button>
            </Link>
            <ShoppingBag />
          </HStack>
        </HStack>
        <Searchbar keyword={keyword} />
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
        <Logo />
        <HStack w="100%">
          <Searchbar keyword={keyword} />
        </HStack>
        <Link href="/signin" passHref>
          <Button bg={"brand.300"}>Sign In</Button>
        </Link>
        <Button bg={"brand.300"}>Orders</Button>
        <ShoppingBag />
      </HStack>
    </Box>
  );
};

export default Navbar;
