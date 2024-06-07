import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import debounce from "../utils/debounce";
import { useLocation, useParams } from "react-router-dom";

function ArticleLayout() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/pages/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pages");
        }
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchId();
  }, [id]);

  const saveTitle = useCallback(
    debounce(async (newTitle: string) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/pages/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ title: newTitle }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
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
