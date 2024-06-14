import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { createNewPage, deleteData } from "../services/api";
import { PageTree } from "./SideBar";

interface PageProps {
  page: PageTree;
  children?: React.ReactNode;
}

const PageList = ({ page, children }: PageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNewChildPage = async () => {
    await createNewPage(`${page._id}`);
  };

  const handleDeletePage = async () => {
    await deleteData(`pages/${page._id}`);
    navigate(-1);
  };

  const handleNavPage = () => {
    navigate(`/${page._id}`, { state: page });
  };

  return (
    <>
      <StyledNav
        onClick={handleNavPage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>{page.title || "제목 없음"}</div>
        <IconContainer onClick={(e) => e.stopPropagation()}>
          {isHovered && <MinusOutlined onClick={handleDeletePage} />}
          {isHovered && <PlusOutlined onClick={handleNewChildPage} />}
        </IconContainer>
      </StyledNav>
      {children}
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  visibility: hidden;
  gap: 10px;
`;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: #eaeaea;
    border-radius: 5px;
    ${IconContainer} {
      visibility: visible;
    }
  }
`;

export default PageList;
