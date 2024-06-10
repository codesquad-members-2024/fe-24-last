import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import debounce from "../utils/debounce";
import { fetchArticleById, updateArticleTitle } from "../services/api";
import { useArticles } from "../contexts/ArticlesProvider";
import * as S from "../styles/ArticleLayout";

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
    <S.Wrapper>
      <S.TitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {currentArticle.title}
      </S.TitleBox>
      <S.Content></S.Content>
    </S.Wrapper>
  );
}

export default ArticleLayout;
