import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import styled from "styled-components";

function Layout() {
  return (
    <LayoutWrap>
      <SideBar />
      <ContentWrap>
        <Outlet />
      </ContentWrap>
    </LayoutWrap>
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
