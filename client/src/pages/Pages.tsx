import styled from "styled-components";
import ArticleLayout from "../components/ArticleLayout";

function Pages() {
  return (
    <Wrapper>
      <ArticleLayout />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default Pages;
