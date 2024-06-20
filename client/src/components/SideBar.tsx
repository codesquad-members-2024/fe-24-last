import {
  FormOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useArticles } from "../contexts/ArticlesProvider";
import { createNewPage, deletePage } from "../services/api";
import * as S from "../styles/SideBar";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const { articlesData, refetch: refetchArticles } = useArticles();
  const navigate = useNavigate();

  const handleNewPage = async () => {
    try {
      await createNewPage();
      refetchArticles();
    } catch (error) {
      console.error("Failed to submit new Pages:", error);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      const pageIndex = articlesData.findIndex((page) => page._id === pageId);

      await deletePage(pageId);
      refetchArticles();

      if (pageIndex > 0) {
        const previousPage = articlesData[pageIndex - 1];
        navigate(`/${previousPage._id}`);
      } else if (articlesData.length > 1) {
        const nextPage = articlesData[pageIndex + 1];
        navigate(`/${nextPage._id}`);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Failed to delete page:", error);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.TopBox>
          <S.UserInfo>사용자 이름</S.UserInfo>
          <S.NewPageButton onClick={handleNewPage}>
            <FormOutlined />
          </S.NewPageButton>
        </S.TopBox>
        <S.MiddleBox>
          <div className="mypages">개인 페이지</div>
          <S.Pages>
            {articlesData.map((page) => (
              <S.SideBarArticleWrapper key={page._id}>
                <S.ArticleTitleBox>
                  <S.ArticleLink to={`/${page._id}`} state={page}>
                    {page.title || "제목 없음"}
                  </S.ArticleLink>
                </S.ArticleTitleBox>
                <S.ArticleButtonBox>
                  <MinusOutlined onClick={() => handleDeletePage(page._id)} />
                  <PlusOutlined />
                </S.ArticleButtonBox>
              </S.SideBarArticleWrapper>
            ))}
          </S.Pages>
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
