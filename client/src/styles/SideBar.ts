import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(247, 247, 245);
  min-width: 240px;

  height: 100vh;
`;

export const TopBox = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const NewPageButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 25px;
  cursor: pointer;
`;

export const MiddleBox = styled.div`
  padding: 0 15px;
  .mypages {
    color: gray;
    margin-bottom: 10px;
  }
`;

export const Pages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BottomBox = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

export const TemplateButton = styled.div`
  display: flex;
  padding: 0 15px;
`;

export const ArticleLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;
