import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce";
import { useLocation, useParams } from "react-router-dom";
import { fetchData, updateData } from "../services/api";

function ArticleLayout() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await fetchData(`pages/${id}`!); // 타입 단언문: id가 확실한 string
        setTitle(pageData.title);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPage();
  }, [id]);

  const saveTitle = useCallback(
    debounce(async (newTitle: string) => {
      try {
        await updateData(`pages/${id}`!, { title: newTitle }); // 타입 단언문
      } catch (error) {
        console.error("Error saving title:", error);
      }
    }, 1000),
    [id]
  );

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    // setTitle(newTitle);
    saveTitle(newTitle);
  };

  return (
    <Wrapper>
      <StyledTitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {title}
      </StyledTitleBox>
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
  &:empty:before {
    content: attr(aria-placeholder);
    color: gray;
  }
`;

const StyledContent = styled.div``;

export default ArticleLayout;
