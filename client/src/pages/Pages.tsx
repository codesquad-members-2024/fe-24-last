import styled from "styled-components";
import ArticleLayout from "../components/ArticleLayout";
import { SideBar } from "../components/SideBar";

function Pages() {
  return (
    <Wrapper>
      <SideBar />
      <ArticleLayout />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default Pages;
