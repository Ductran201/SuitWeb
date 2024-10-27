import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";

const routerAll = createBrowserRouter([...privateRoutes, ...publicRoutes]);

export default routerAll;
