import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </>
  );
}

export default App;
