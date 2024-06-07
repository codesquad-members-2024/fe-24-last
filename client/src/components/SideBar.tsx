import styled from "styled-components";
import { FormOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Page {
  _id: string;
  title: string;
  blocklist: [];
  parent_id: string;
}

export function SideBar() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pages`);
        if (!response.ok) {
          throw new Error("Failed to fetch pages");
        }
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const handleNewPage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          blocklist: [],
          parent_id: "",
        }),
      });
      if (!response.ok) {
        console.log("실패 !");
      }
    } catch (error) {
      console.error("Failed to submit new Pages:", error);
    }
  };

  return (
    <>
      <Wrapper>
        <StyledTopBox>
          <UserInfo>사용자 이름</UserInfo>
          <NewPageButton onClick={handleNewPage}>
            <FormOutlined />
          </NewPageButton>
        </StyledTopBox>
        <StyledMiddleBox>
          <div className="mypages">개인 페이지</div>
          <StyledPages>
            {pages.map((page) => (
              <StyledLink to={`/${page._id}`} state={page} key={page._id}>
                {page.title || "제목 없음"}
              </StyledLink>
            ))}
          </StyledPages>
        </StyledMiddleBox>
        <StyledBottomBox>
          <TemplateButton>
            <CheckOutlined />
            <div>할 일 목록 템플릿</div>
          </TemplateButton>
        </StyledBottomBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(247, 247, 245);
  min-width: 240px;

  height: 100vh;
`;

const StyledTopBox = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const NewPageButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 25px;
  cursor: pointer;
`;

const StyledMiddleBox = styled.div`
  padding: 0 15px;
  .mypages {
    color: gray;
    margin-bottom: 10px;
  }
`;

const StyledPages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledBottomBox = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

const TemplateButton = styled.div`
  display: flex;
  padding: 0 15px;
`;

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`;
