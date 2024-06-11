import { createBrowserRouter } from "react-router-dom";
import Pages from "../pages/Pages";
import Layout from "../pages/Layout"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:id",
        element: <Pages />,
      },
    ],
  },
]);

export default routes;
