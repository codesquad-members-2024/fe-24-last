import styled from "styled-components";
import { FormOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetPage, useCreateNewData, NewPageData } from "../services/api";
import PageList from "./PageList";
import { buildPageTree } from "../utils/buildTree";

export interface Page {
  _id: string;
  title: string;
  blocklist: [];
  parent_id: string;
}

export interface PageTree extends Page {
  children: PageTree[];
}

export function SideBar() {
  const [pages, setPages] = useState<PageTree[]>([]);
  const { data } = useGetPage("pages");
  const createNewData = useCreateNewData();

  useEffect(() => {
    if (data) setPages(buildPageTree(data));
  }, [data]);

  const handleNewPage = () => {
    const newPageData: NewPageData = {
      title: "",
      blocklist: [],
      parent_id: "",
    };

    createNewData(newPageData);
  };

  const renderPageTree = (pages: PageTree[]) => {
    return pages.map((page) => (
      <PageList key={page._id} page={page}>
        {page.children.length > 0 && (
          <div style={{ paddingLeft: "10px" }}>
            {renderPageTree(page.children)}
          </div>
        )}
      </PageList>
    ));
  };

  return (
    <Wrapper>
      <StyledTopBox>
        <UserInfo>마롱의 노션</UserInfo>
        <NewPageButton onClick={handleNewPage}>
          <FormOutlined />
        </NewPageButton>
      </StyledTopBox>
      <StyledMiddleBox>
        <div className="mypages">개인 페이지</div>
        <StyledPages>{renderPageTree(pages)}</StyledPages>
      </StyledMiddleBox>
      <StyledBottomBox>
        <TemplateButton>
          <CheckOutlined />
          <div>할 일 목록 템플릿</div>
        </TemplateButton>
      </StyledBottomBox>
    </Wrapper>
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
