import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import debounce from "../utils/debounce";
import { focusOnBlock } from "../utils/focus";
import { Block } from "../model/types";
import {
  fetchArticleById,
  updateArticleTitle,
  createNewBlockOrElement,
} from "../services/api";
import { useArticles } from "../contexts/ArticlesProvider";
import * as S from "../styles/ArticleLayout";
import BlockBox from "./BlockBox";
import { useEffect, useState } from "react";

function ArticleLayout() {
  const { id } = useParams<{ id: string }>();
  const { refetch: refetchArticles } = useArticles();
  const {
    data: currentArticle,
    error,
    isLoading,
    refetch: refetchCurrentArticle,
  } = useQuery(["article", id], () => fetchArticleById(id), {
    enabled: !!id,
  });

  const [debouncedSaveTitle] = debounce(async (newTitle: string) => {
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

  const handleWrapperClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const paddingBottom = parseInt(
      window.getComputedStyle(wrapper).paddingBottom,
      10
    );
    const clickY = e.clientY;
    const wrapperRect = wrapper.getBoundingClientRect();
    const isInBottomPadding = clickY > wrapperRect.bottom - paddingBottom;

    if (isInBottomPadding) {
      if (currentArticle && currentArticle.blocklist.length > 0) {
        const lastBlock =
          currentArticle.blocklist[currentArticle.blocklist.length - 1];
        try {
          await createNewBlockOrElement(id, lastBlock._id);
          refetchCurrentArticle();
        } catch (error) {
          console.error("Failed to create new block:", error);
        }
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  const { title, blocklist } = currentArticle;

  return (
    <S.Wrapper onClick={handleWrapperClick}>
      <S.TitleBox
        contentEditable
        aria-placeholder="제목없음"
        onInput={handleTitleChange}
        suppressContentEditableWarning
      >
        {title}
      </S.TitleBox>
      <S.Content>
        {blocklist.map((block: Block, index: number) => {
          return (
            <BlockBox
              key={`block-${block._id}`}
              blockData={block}
              refetchCurrentArticle={refetchCurrentArticle}
              blockIndex={index}
            />
          );
        })}
      </S.Content>
    </S.Wrapper>
  );
}

export default ArticleLayout;
