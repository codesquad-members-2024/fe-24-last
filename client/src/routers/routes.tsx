import { createBrowserRouter } from "react-router-dom";
import Articles from "../pages/Articles";
import Layout from "../pages/Layout";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:id",
        element: <Articles />,
      },
    ],
  },
]);

export default routes;
