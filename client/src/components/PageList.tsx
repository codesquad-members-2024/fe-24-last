import styled from "styled-components";
import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "./SideBar";
import { createNewPage, deletePage } from "../services/api";

interface PageProps {
  page: Page;
}

const PageList = ({ page }: PageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleNewChildPage = async () => {
    await createNewPage(`pages/${page._id}`);
  };

  const handleDeletePage = async () => {
    await deletePage(`pages/${page._id}`);
    navigate(-1);
  };

  return (
    <StyledLink
      to={`/${page._id}`}
      state={page}
      key={page._id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {page.title || "제목 없음"}
      <IconContainer>
        {isHovered && <MinusOutlined onClick={handleDeletePage} />}
        {isHovered && <PlusOutlined onClick={handleNewChildPage} />}
      </IconContainer>
    </StyledLink>
  );
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  visibility: hidden;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: unset;
  text-decoration: unset;
  padding: 5px 0;
  &:hover {
    background-color: #eaeaea;
    border-radius: 5px;
    ${IconContainer} {
      visibility: visible;
    }
  }
`;

export default PageList;
