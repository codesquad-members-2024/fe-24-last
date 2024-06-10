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

// 콘텍스르를 사용해 title을 공유 현재 카드 아이디와 url이 같다면? context title을 사용 아니라면 넘겨받은 title을 사용
// 페이지에서는 context의 타이틀을 사용
