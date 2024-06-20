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

  & span {
    width: 20px;
  }
`;

export const MiddleBox = styled.div`
  padding: 0 5px;
  .mypages {
    color: gray;
    font-size: 13px;
    margin-bottom: 10px;
    padding: 0 8px;
  }
`;

export const Pages = styled.div`
  display: flex;
  flex-direction: column;
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
  gap: 7px;
  color: rgb(103, 102, 98);
`;

export const ArticleTitleBox = styled.div`
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ArticleLink = styled(Link)`
  color: rgb(103, 102, 98);
  text-decoration: unset;
  font-weight: 500;
`;

export const ArticleButtonBox = styled.div`
  display: none;
  gap: 8px;

  & span {
    cursor: pointer;
    width: 15px;
  }
`;

export const SideBarArticleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 8px;
  border-radius: 8px;
  &:hover {
    background-color: rgb(239, 239, 237);
  }

  &:hover ${ArticleTitleBox} {
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:hover ${ArticleButtonBox} {
    display: flex;
  }
`;
