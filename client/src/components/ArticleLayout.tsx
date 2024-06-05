import styled from "styled-components";
import { useCallback } from "react";
import debounce from "../utils/debounce";

function ArticleLayout() {
  // const [title, setTitle] = useState<string>("");

  const saveTitle = useCallback(
    debounce((newTitle) => {
      fetch("http://localhost:3000/api/pages/665ffbe3d856e004e7d6622f", {
        method: "PATCH",
        body: JSON.stringify({ title: newTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    }, 1000),
    []
  );

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    // setTitle(newTitle);
    saveTitle(newTitle);
  };

  return (
    <Wrapper>
      <StyledTitleBox contentEditable aria-placeholder="제목없음" onInput={handleTitleChange}></StyledTitleBox>
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
