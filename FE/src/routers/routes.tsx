import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Page from "../pages/Page";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "page/:id",
                element: <Page />,
            },
        ],
    },
]);

export default routes;
