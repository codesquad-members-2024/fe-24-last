import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
    return (
        <div>
            <SideBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
