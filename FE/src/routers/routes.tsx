import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Page from "../pages/Page";
import Home from "../pages/Home";
import Template from "../pages/Template";

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
            {
                path: "template/:id",
                element: <Template />,
            },
        ],
    },
]);

export default routes;
