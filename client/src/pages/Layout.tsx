import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import styled from "styled-components";
import { ArticlesProvider } from "../contexts/ArticlesProvider";

function Layout() {
  return (
    <ArticlesProvider>
      <LayoutWrap>
        <SideBar />
        <ContentWrap>
          <Outlet />
        </ContentWrap>
      </LayoutWrap>
    </ArticlesProvider>
  );
}

const LayoutWrap = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentWrap = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default Layout;
