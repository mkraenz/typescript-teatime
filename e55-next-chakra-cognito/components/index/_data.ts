export const images = [
  {
    id: "01",
    src:
      "https://images.unsplash.com/photo-1569094753427-1c73873ee20e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    alt: "Fennel",
  },
  {
    id: "02",
    src:
      "https://images.unsplash.com/photo-NrU_REDGCws?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80",
    alt: "Awesome watch",
  },
  {
    id: "03",
    src:
      "https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    alt: "Awesome watch",
  },
  {
    id: "04",
    src:
      "https://images.unsplash.com/photo-1569411032431-07598b0012c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    alt: "Awesome watch",
  },
  {
    id: "05",
    src:
      "https://images.unsplash.com/photo-1565440962783-f87efdea99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80",
    alt: "Awesome watch",
  },
  {
    id: "06",
    src:
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
    alt: "Awesome watch",
  },
];

export const products = [
  {
    id: "1",
    name: "Fennel, Toscana, Italy",
    currency: "EUR",
    price: 12.9,
    flag: "new",
    imageUrl:
      "https://images.unsplash.com/photo-1569094753427-1c73873ee20e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    rating: 4,
    ratingCount: 1,
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.",
  },
  {
    id: "2",
    name: "Darjeeling, India",
    currency: "EUR",
    price: 12.9,
    salePrice: 9.99,
    flag: "on-sale",
    imageUrl:
      "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80",
    rating: 4,
    ratingCount: 12,
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.",
  },
  {
    id: "3",
    name: "Jasmine Tea, Fujian, China",
    currency: "EUR",
    price: 12.9,
    imageUrl:
      "https://images.unsplash.com/photo-1531876841334-5f48d532110b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    rating: 4,
    ratingCount: 12,
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.",
  },
  {
    id: "4",
    name: "Sencha Green Tea, Fukuoka, Japan",
    currency: "EUR",
    price: 12.9,
    imageUrl:
      "https://images.unsplash.com/photo-1547965010-3189f704431b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1322&q=80",
    rating: 5,
    ratingCount: 1,
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.",
  },
  {
    id: "5",
    name: "Uji Green Tea, Kyoto, Japan",
    currency: "EUR",
    price: 12.9,
    imageUrl:
      "https://images.unsplash.com/photo-1611836579732-d4dd63dc5492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1306&q=80",
    rating: 5,
    ratingCount: 1,
    description:
      "With a sleek design and a captivating essence, this is a modern Classic made for every occasion.",
  },
];

export type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type Product = ElementType<typeof products>;
export type ProductImage = ElementType<typeof images>;
