import {
  FormOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useArticles } from "../contexts/ArticlesProvider";
import { createNewArticle, deleteArticle } from "../services/api";
import * as S from "../styles/SideBar";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const { articlesData, refetch: refetchArticles } = useArticles();
  const navigate = useNavigate();

  const handleNewArticle = async () => {
    try {
      await createNewArticle();
      refetchArticles();
    } catch (error) {
      console.error("Failed to submit new Articles:", error);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const articleIndex = articlesData.findIndex(
        (article) => article._id === articleId
      );

      await deleteArticle(articleId);
      refetchArticles();

      if (articleIndex > 0) {
        const previousArticle = articlesData[articleIndex - 1];
        navigate(`/${previousArticle._id}`);
      } else if (articlesData.length > 1) {
        const nextArticle = articlesData[articleIndex + 1];
        navigate(`/${nextArticle._id}`);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.TopBox>
          <S.UserInfo>사용자 이름</S.UserInfo>
          <S.NewArticleButton onClick={handleNewArticle}>
            <FormOutlined />
          </S.NewArticleButton>
        </S.TopBox>
        <S.MiddleBox>
          <div className="my-articles">개인 페이지</div>
          <S.Articles>
            {articlesData.map((article) => (
              <S.SideBarArticleWrapper key={article._id}>
                <S.ArticleTitleBox>
                  <S.ArticleLink to={`/${article._id}`} state={article}>
                    {article.title || "제목 없음"}
                  </S.ArticleLink>
                </S.ArticleTitleBox>
                <S.ArticleButtonBox>
                  <MinusOutlined
                    onClick={() => handleDeleteArticle(article._id)}
                  />
                  <PlusOutlined />
                </S.ArticleButtonBox>
              </S.SideBarArticleWrapper>
            ))}
          </S.Articles>
        </S.MiddleBox>
        <S.BottomBox>
          <S.TemplateButton>
            <CheckOutlined />
            <div>할 일 목록 템플릿</div>
          </S.TemplateButton>
        </S.BottomBox>
      </S.Wrapper>
    </>
  );
}
