import AdminLayout from "../layouts/admin";
import CategoryAdmin from "../pages/admin/category/CategoryAdmin";
import ColorAdmin from "../pages/admin/color/ColorAdmin";
import DashboardAdmin from "../pages/admin/dashboard/Dashboard";
import OrderAdmin from "../pages/admin/order/OrderAdmin";
import OrderDetailAdmin from "../pages/admin/order/OrderDetailAdmin";
import ProductAdmin from "../pages/admin/product/ProductAdmin";
import ProductDetailAdmin from "../pages/admin/productDetail/ProductDetailAdmin";
import SizeAdmin from "../pages/admin/size/SizeAdmin";
import UserAdmin from "../pages/admin/user/UserAdmin";
// import AccountRecord from "../pages/user/AccountRecord/AccountRecord";

const privateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: "user",
        element: <UserAdmin />,
      },
      {
        path: "category",
        element: <CategoryAdmin />,
      },
      {
        path: "product",
        element: <ProductAdmin />,
      },
      {
        path: "color",
        element: <ColorAdmin />,
      },
      {
        path: "size",
        element: <SizeAdmin />,
      },
      {
        path: "order",
        element: <OrderAdmin />,
        children: [{ path: ":orderId", element: <OrderDetailAdmin /> }],
      },
      {
        path: "productDetail/:productId",
        element: <ProductDetailAdmin />,
      },
    ],
  },
];

export default privateRoutes;
