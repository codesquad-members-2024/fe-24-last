import styled from "styled-components";

function ArticleLayout() {
  return (
    <Wrapper>
      <StyledTitleBox contentEditable aria-placeholder="제목없음"></StyledTitleBox>
      <StyledContent></StyledContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 30vh;
  padding-left: 100px;
  padding-right: 100px;
  flex-grow: 1;
`;

const StyledTitleBox = styled.h1`
  width: 100%;
  max-width: 900px;
  height: 60px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  &:empty:before{
    content: attr(aria-placeholder);
    color: gray;
  }
`;

const StyledContent = styled.div``;

export default ArticleLayout;
