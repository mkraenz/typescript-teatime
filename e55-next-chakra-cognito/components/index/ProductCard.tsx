import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FavouriteButton } from "./FavouriteButton";
import { PriceTag } from "./PriceTag";
import { Rating } from "./Rating";
import { Product } from "./_data";

interface Props {
  product: Product;
  rootProps?: StackProps;
}

export const ProductCard = (props: Props) => {
  const router = useRouter();
  const gotoCart = () => router.push("/cart");

  const { product, rootProps } = props;
  const { name, imageUrl, price, salePrice, rating } = product;
  const addToCart = () => {
    const loggedIn = false; // TODO: handle login and provide context
    if (loggedIn) {
      // TODO: send mutation to add product x amount to user's cart
    } else {
      saveProductToLocalStorage(product);
    }
    return gotoCart();
  };
  return (
    <Stack
      spacing={useBreakpointValue({ base: "4px", md: "5px" })}
      {...rootProps}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 4}>
          <Image
            src={imageUrl}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${name} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {name}
          </Text>
          <PriceTag price={price} salePrice={salePrice} currency="USD" />
        </Stack>
        <HStack>
          <Rating defaultValue={rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button isFullWidth onClick={addToCart}>
          Add to cart
        </Button>
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Quick shop
        </Link>
      </Stack>
    </Stack>
  );
};
function saveProductToLocalStorage(product: { id: string }) {
  type Amount = number;
  type Cart = { [productId: string]: Amount };
  const prevCart: Cart = JSON.parse(
    window.localStorage.getItem("cart") || "{}"
  );
  const previousAmountOfProduct = prevCart[product.id] || 0;
  const cart = {
    ...prevCart,
    [product.id]: previousAmountOfProduct + 1,
  };
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
