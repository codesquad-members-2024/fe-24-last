import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import * as S from "../styles/LayoutStyle"

const Layout = () => {
    return (
        <S.LayoutWrap>
            <SideBar />
            <S.ContentWrap>
                <Outlet />
            </S.ContentWrap>
        </S.LayoutWrap>
    );
};

export default Layout;