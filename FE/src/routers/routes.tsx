import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Page from "../pages/Page";
import Home from "../pages/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "page/:id",
                element: <Page />,
            },
        ],
    },
]);

export default routes;
