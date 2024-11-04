import AdminLayout from "../layouts/admin";
import CategoryAdmin from "../pages/admin/category/CategoryAdmin";
import ColorAdmin from "../pages/admin/color/ColorAdmin";
import DashboardAdmin from "../pages/admin/dashboard/Dashboard";
import ProductAdmin from "../pages/admin/product/ProductAdmin";
import ProductDetailAdmin from "../pages/admin/productDetail/ProductDetailAdmin";
import SizeAdmin from "../pages/admin/size/SizeAdmin";
import UserAdmin from "../pages/admin/user/UserAdmin";

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
        path: "productDetail/:productId",
        element: <ProductDetailAdmin />,
      },
    ],
  },
];

export default privateRoutes;
