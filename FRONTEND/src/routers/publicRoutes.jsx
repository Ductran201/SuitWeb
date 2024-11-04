import ShopLayout from "../layouts/user";
import AboutShop from "../pages/all/about/AboutShop";
import ContactShop from "../pages/all/contact/ContactShop";
import HomeShop from "../pages/all/home/HomeShop";
import ProductByCategory from "../pages/all/ProductByCategory";
import ProductDetail from "../pages/all/ProductDetail";
import App from "../pages/all/Test";

const publicRoutes = [
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomeShop />,
      },
      {
        path: "contact",
        element: <ContactShop />,
      },
      {
        path: "about",
        element: <AboutShop />,
      },
    ],
  },

  {
    path: "/category/:id",
    element: <ProductByCategory />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/test",
    element: <App />,
  },
];

export default publicRoutes;
