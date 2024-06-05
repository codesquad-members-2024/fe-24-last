import "./styles/App.css"
import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";
import { ReactQueryDevtools } from 'react-query/devtools'
function App() {
    return (
        <div className="App">
            <RouterProvider router={routes}/>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </div>
    );
}

export default App;
