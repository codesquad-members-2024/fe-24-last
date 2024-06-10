import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import debounce from "../utils/debounce";
import { fetchArticleById, updateArticleTitle } from "../services/api";
import { useArticles } from "../contexts/ArticlesProvider";

function ArticleLayout() {
  const { id } = useParams<{ id: string }>();
  const { refetch: refetchArticles } = useArticles();
  const {
    data: currentArticle,
    error,
    isLoading,
  } = useQuery(["article", id], () => fetchArticleById(id), {
    enabled: !!id,
  });

  const debouncedSaveTitle = debounce(async (newTitle: string) => {
    try {
      await updateArticleTitle(id, newTitle);
      refetchArticles();
    } catch (error) {
      console.error("Error:", error);
    }
  }, 1000);

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newTitle = e.currentTarget.innerText;
    debouncedSaveTitle(newTitle);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  return (
    <Wrapper>
      <StyledTitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {currentArticle.title}
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
