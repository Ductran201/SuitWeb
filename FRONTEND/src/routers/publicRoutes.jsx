import ShopLayout from "../layouts/user";
import AboutShop from "../pages/all/about/AboutShop";
import ContactShop from "../pages/all/contact/ContactShop";
import HomeShop from "../pages/all/home/HomeShop";
import ProductByCategory from "../pages/all/ProductByCategory";
import ProductDetail from "../pages/all/ProductDetail";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UnauthorizedPage from "../pages/Unauthorized";

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
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
];

export default publicRoutes;
