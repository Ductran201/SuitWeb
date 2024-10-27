import ShopLayout from "../layouts/user";
import AboutShop from "../pages/all/AboutShop";
import ContactShop from "../pages/all/ContactShop";
import HomeShop from "../pages/all/HomeShop";

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
];

export default publicRoutes;
