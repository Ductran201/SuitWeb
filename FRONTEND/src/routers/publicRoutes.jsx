import { patch } from "@mui/material";
import AccountRecord from "../layouts/accountRecord";
import ShopLayout from "../layouts/user";
import AboutShop from "../pages/all/about/AboutShop";
import ContactShop from "../pages/all/contact/ContactShop";
import HomeShop from "../pages/all/home/HomeShop";
import ProductByCategory from "../pages/all/ProductByCategory";
import ProductDetail from "../pages/all/ProductDetail";
import Test from "../pages/all/Test";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UnauthorizedPage from "../pages/Unauthorized";
import Information from "../pages/user/information/Information";
import Social from "../pages/user/social/Social";
import WishList from "../pages/user/wishList/WishList";
import ShippingAddress from "../pages/user/shippingAddress/ShippingAddress";
import History from "../pages/user/history/History";
import Coupons from "../pages/user/coupons/Coupons";
import data from "../data/index.json";
import CartUser from "../pages/user/cart/CartUser";
import ProductCard from "../pages/all/ProductCard";
import Test2 from "../pages/all/home/Test2";
import Checkout from "../pages/user/checkout/Checkout";
import DonePayment from "../pages/user/donePayment/DonePayment";

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

      {
        path: "branch",
        element: <ProductCard />,
      },
      {
        path: "/account",
        element: <AccountRecord />,
        children: [
          {
            index: true,
            path: "infor",
            element: <Information />,
          },
          {
            path: "social",
            element: <Social />,
          },
          {
            path: "shipping-address",
            element: <ShippingAddress />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "coupons",
            element: <Coupons />,
          },
          {
            path: "wishlist",
            element: <WishList />,
          },
        ],
      },
      {
        path: "/cart",
        element: <CartUser />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/category/:id",
        element: <ProductByCategory />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/test",
        element: <Test data={data} />,
      },

      {
        path: "/test2",
        element: <Test2 />,
      },
    ],
  },

  {
    path: "/done",
    element: <DonePayment />,
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
