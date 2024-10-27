import CategoryAdmin from "../pages/admin/CategoryAdmin";
import AdminLayout from "../layouts/admin";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import ProductAdmin from "../pages/admin/ProductAdmin";
import UserAdmin from "../pages/admin/UserAdmin";
import ProductDetailAdmin from "../pages/admin/ProductDetailAdmin";
import SizeAdmin from "../pages/admin/SizeAdmin";
import ColorAdmin from "../pages/admin/ColorAdmin";

const privateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
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
