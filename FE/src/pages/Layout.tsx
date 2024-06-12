import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import * as S from "../styles/LayoutStyle";
import { TitleProvider } from "../hooks/useTitleContext";
const Layout = () => {
    return (
        <TitleProvider>
            <S.LayoutWrap>
                <SideBar />
                <S.ContentWrap>
                    <Outlet />
                </S.ContentWrap>
            </S.LayoutWrap>
        </TitleProvider>
    );
};

export default Layout;