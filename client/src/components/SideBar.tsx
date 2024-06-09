import styled from "styled-components";
import { FormOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createNewPage } from "../services/api";
import { fetchData } from "../services/api";
import PageList from "./PageList";

export interface Page {
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
        const pages = await fetchData(`pages`);
        setPages(pages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const handleNewPage = async () => {
    await createNewPage("");
  };

  return (
    <>
      <Wrapper>
        <StyledTopBox>
          <UserInfo>마롱의 노션</UserInfo>
          <NewPageButton onClick={handleNewPage}>
            <FormOutlined />
          </NewPageButton>
        </StyledTopBox>
        <StyledMiddleBox>
          <div className="mypages">개인 페이지</div>
          <StyledPages>
            {pages.map((page) => (
              <PageList key={page._id} page={page} />
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
  padding: 15px;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NewPageButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
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
`;

const StyledBottomBox = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

const TemplateButton = styled.div`
  display: flex;
  padding: 15px;
  gap: 10px;
`;
