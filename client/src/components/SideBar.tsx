import { FormOutlined, CheckOutlined } from "@ant-design/icons";
import { useArticles } from "../contexts/ArticlesProvider";
import { createNewPage } from "../services/api";
import * as S from "../styles/SideBar";

export function SideBar() {
  const { articlesData, refetch: refetchArticles } = useArticles();

  const handleNewPage = async () => {
    try {
      await createNewPage();
      refetchArticles();
    } catch (error) {
      console.error("Failed to submit new Pages:", error);
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
              <S.ArticleLink to={`/${page._id}`} state={page} key={page._id}>
                {page.title || "제목 없음"}
              </S.ArticleLink>
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
