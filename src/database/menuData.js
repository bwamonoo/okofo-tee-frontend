const menuData = [
  {
    id: 1,
    name: "Bottle Pepsi",
    image: require("../assets/images/bottle-pepsi.png"),
    price: 20.0,
    menuCategoryId: 2,
  },
  {
    id: 2,
    name: "Pepsi Can",
    image: require("../assets/images/can-pepsi.png"),
    price: 50.0,
    menuCategoryId: 2,
  },
  {
    id: 3,
    name: "Bottle Coke",
    image: require("../assets/images/bottle-coke.png"),
    price: 20.0,
    menuCategoryId: 2,
  },
  {
    id: 4,
    name: "Can Coke",
    image: require("../assets/images/can-coke.png"),
    price: 20.0,
    menuCategoryId: 2,
  },
  {
    id: 5,
    name: "Cran Apple",
    image: require("../assets/images/bottle-cran-apple.png"),
    price: 50.0,
    menuCategoryId: 2,
  },
  {
    id: 6,
    name: "Welch",
    image: require("../assets/images/bottle-welch.png"),
    price: 50.0,
    menuCategoryId: 2,
  },
  {
    id: 7,
    name: "Yoghurt",
    image: require("../assets/images/bottle-yoghurt.png"),
    price: 50.0,
  },
  {
    id: 8,
    name: "Chicken Tomato Mix",
    image: require("../assets/images/chicken-tomato-mix.png"),
    price: 210.0,
    menuCategoryId: 1,
    type: "circle",
  },
  {
    id: 9,
    name: "Assorted Rice",
    image: require("../assets/images/assorted-rice.png"),
    price: 51.0,
    menuCategoryId: 1,
    type: "circle",
  },
  {
    id: 10,
    name: "Rice & Chicken",
    image: require("../assets/images/rice-and-chicken.png"),
    price: 68.0,
    menuCategoryId: 1,
    type: "circle",
  },
  {
    id: 11,
    name: "Spicy Fish Sauce",
    image: require("../assets/images/spicy-fish-sauce.png"),
    price: 45.99,
    menuCategoryId: 1,
    type: "circle",
  },
  {
    id: 12,
    name: "Lays Baked",
    image: require("../assets/images/lays-baked.png"),
    price: 25.0,
    menuCategoryId: 3,
  },
  {
    id: 13,
    name: "Doritos Cheese",
    image: require("../assets/images/doritos.png"),
    price: 21.0,
    menuCategoryId: 3,
  },
  {
    id: 14,
    name: "Ruffles Flamin Hot",
    image: require("../assets/images/ruffles.png"),
    price: 20.5,
    menuCategoryId: 3,
  },
  {
    id: 15,
    name: "Oreo Peanut Butter",
    image: require("../assets/images/oreo.png"),
    price: 25.0,
  },
  {
    id: 16,
    name: "Chicken & Pepper Sauce",
    image: require("../assets/images/chicken-and-pepper-sauce.png"),
    menuCategoryId: 4,
    price: 60.0,
    type: "circle",
  },
  {
    id: 17,
    name: "Pork Sauce",
    image: require("../assets/images/pork-sauce.png"),
    price: 63.59,
    menuCategoryId: 4,
    type: "circle",
  },
  {
    id: 18,
    name: "Prawn Sauce",
    image: require("../assets/images/prawn-sauce.png"),
    price: 50.65,
    menuCategoryId: 4,
    type: "circle",
  },
  {
    id: 19,
    name: "Spicy Fish Sauce",
    image: require("../assets/images/spicy-fish-sauce.png"),
    price: 23.0,
    menuCategoryId: 4,
    type: "circle",
  },
  {
    id: 20,
    name: "Beef Sauce",
    image: require("../assets/images/beef-sauce.png"),
    price: 50.0,
    menuCategoryId: 4,
    type: "circle",
  },
  {
    id: 21,
    name: "Vegetable Sauce",
    image: require("../assets/images/vegetable-sauce.png"),
    price: 50.0,
    menuCategoryId: 4,
    type: "circle",
  },
];

export const drinkData = menuData.filter((menu) => menu.menuCategoryId === 2);

export const foodData = menuData.filter((menu) => menu.menuCategoryId === 1);

export const snackData = menuData.filter((menu) => menu.menuCategoryId === 3);

export const sauceData = menuData.filter((menu) => menu.menuCategoryId === 4);
