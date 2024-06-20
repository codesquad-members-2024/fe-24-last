import styled from "styled-components";

export const Wrapper = styled.div`
  padding-bottom: 30vh;
  margin-left: 100px;
  margin-right: 100px;
  flex-grow: 1;
`;

export const TitleBox = styled.h1`
  width: 100%;
  max-width: 900px;
  height: 60px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  &:empty:before {
    content: attr(aria-placeholder);
    color: gray;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
